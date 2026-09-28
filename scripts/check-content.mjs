// Checks src/content against the forms in .pages.yml before the build.
//
// Pages CMS rewrites a file from its form when an editor saves, so a value in
// the JSON with no matching form field is silently dropped on the next save.
// This fails the build instead: every value needs a field of the same kind,
// list-ness, select value and pattern, every required field needs a value,
// and every file in src/content needs a form.

import { readFileSync, readdirSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { parse } from "yaml";

const root = resolvePath(import.meta.dirname, "..");
const config = parse(readFileSync(resolvePath(root, ".pages.yml"), "utf8"));
const problems = [];

// A field that names a component takes the component's definition, with the
// field's own keys on top.
const resolve = (field) => {
  if (!field.component) return field;
  const { component, ...rest } = field;
  return resolve({ ...config.components[component], ...rest });
};

const KINDS = {
  string: "string",
  text: "string",
  image: "string",
  file: "string",
  date: "string",
  select: "string",
  number: "number",
  boolean: "boolean",
};

function checkValue(raw, value, path) {
  const field = resolve(raw);
  if (Boolean(field.list) !== Array.isArray(value)) {
    problems.push(`${path}: the form ${field.list ? "is" : "is not"} a list but the JSON ${Array.isArray(value) ? "is" : "is not"}`);
    return;
  }
  if (field.list) value.forEach((item, i) => checkItem(field, item, `${path}[${i}]`));
  else checkItem(field, value, path);
}

function checkItem(field, value, path) {
  if (field.type === "object") return checkObject(field.fields, value, path);
  if (field.type === "block") {
    const key = field.blockKey ?? "_block";
    const block = field.blocks.find((b) => b.name === value?.[key]);
    if (!block) return problems.push(`${path}: no block named "${value?.[key]}"`);
    const { [key]: _, ...rest } = value;
    return checkObject(resolve(block).fields, rest, path);
  }
  if (typeof value !== KINDS[field.type]) {
    problems.push(`${path}: a ${field.type} field holds a ${typeof value}`);
  }
  if (field.type === "select") {
    const names = field.options.values.map((v) => (typeof v === "string" ? v : v.name));
    if (!names.includes(value)) problems.push(`${path}: "${value}" is not one of ${names.join(", ")}`);
  }
  if (field.pattern) {
    const regex = typeof field.pattern === "string" ? field.pattern : field.pattern.regex;
    if (!new RegExp(regex).test(value)) problems.push(`${path}: "${value}" does not match ${regex}`);
  }
}

function checkObject(fields, obj, path) {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return problems.push(`${path}: expected an object`);
  }
  const byName = new Map(fields.map((f) => [f.name, f]));
  for (const [key, value] of Object.entries(obj)) {
    const field = byName.get(key);
    if (field) checkValue(field, value, `${path}.${key}`);
    else problems.push(`${path}.${key}: not in the form, so Pages CMS would drop it on save`);
  }
  for (const field of fields) {
    if (!(field.name in obj) && resolve(field).required) {
      problems.push(`${path}.${field.name}: required by the form but missing`);
    }
  }
}

const entries = [];
const collect = (items) =>
  items.forEach((e) => (e.type === "group" ? collect(e.items) : entries.push(e)));
collect(config.content);

const jsonIn = (dir) =>
  readdirSync(resolvePath(root, dir))
    .filter((f) => f.endsWith(".json"))
    .map((f) => `${dir}/${f}`);

for (const entry of entries) {
  const files = entry.type === "file" ? [entry.path] : jsonIn(entry.path);
  for (const file of files) {
    checkObject(entry.fields, JSON.parse(readFileSync(resolvePath(root, file), "utf8")), file);
  }
}
for (const file of jsonIn("src/content")) {
  if (!entries.some((e) => e.path === file)) problems.push(`${file}: has no form in .pages.yml`);
}

if (problems.length) {
  console.error(`Content does not match .pages.yml:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`Content matches .pages.yml (${entries.length} forms)`);
