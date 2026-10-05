export type SnippetName = "portal" | "api" | "mail";

// What the desk writes on each carrier channel, all for the same submission:
// the portal's form, the API request and the email to the underwriter. They
// are texture rather than reading matter, so they're set small, cropped at the
// edges and hidden from assistive tech. Hosts are .example and addresses are
// documentation ranges, and the tokens decode to a note saying they're fake.
const SNIPPETS: Record<SnippetName, string> = {
  portal: `<!-- New business · BOP · step 3 of 5 -->
<form id="bop-qualify" action="/submissions/BOP-20481/questions" method="post">
  <input type="hidden" name="csrf" value="b7f3e91c0a4d">
  <fieldset>
    <legend>Applicant</legend>
    <label for="insured">Named insured</label>
    <input id="insured" name="insured" value="Sample Bakery LLC">
    <label for="naics">NAICS</label>
    <input id="naics" name="naics" value="311811">
    <label for="years">Years in business</label>
    <input id="years" name="years_in_business" value="8">
  </fieldset>
  <fieldset>
    <legend>Qualifying questions</legend>
    <label>Any losses in the past 3 years?</label>
    <select name="prior_losses"><option selected>No</option></select>
    <label>Deep fat frying on premises?</label>
    <select name="frying"><option selected>No</option></select>
    <label for="sales">Annual gross sales</label>
    <input id="sales" name="annual_sales" value="1240000">
  </fieldset>
  <button type="submit">Continue to quote</button>
</form>`,

  api: `POST /v2/quotes HTTP/1.1
Host: api.samplecarrier.example
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlyZC1wbGFuZS1kZXNrIiwiYXVkIjoic2FtcGxlY2FycmllciIsInNjb3BlIjoicXVvdGVzOndyaXRlIiwiZXhwIjoxNzkxMjE2MDAwfQ.bm90IGEgcmVhbCBzaWduYXR1cmUsIGFuIGlsbHVzdHJhdGlvbiBvbmx5
Content-Type: application/json
Accept: application/json
Idempotency-Key: 6f1d2c84-bop-20481
X-Request-Id: tp-desk-7c41a9

{
  "insured": {
    "name": "Sample Bakery LLC",
    "naics": "311811",
    "years_in_business": 8
  },
  "line": "BOP",
  "effective_date": "2026-11-01",
  "limits": { "occurrence": 1000000, "aggregate": 2000000 },
  "property": { "building": 0, "bpp": 185000 },
  "prior_losses": [],
  "producer_code": "TP-0042"
}`,

  mail: `Return-Path: <desk@thirdplane.example>
Received: from mail.thirdplane.example (mail.thirdplane.example [192.0.2.24])
        by mx.examplespecialty.example with ESMTPS id 4Hx2kQ9
        for <underwriting@examplespecialty.example>; Tue, 6 Oct 2026 09:14:07 -0500
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=thirdplane.example; s=desk;
        h=from:to:subject:date:message-id:in-reply-to:references;
        b=bm90IGEgcmVhbCBzaWduYXR1cmUsIGp1c3QgYW4gaWxsdXN0cmF0aW9uIG9mIG9uZQ==
Message-ID: <desk.20481.3@thirdplane.example>
In-Reply-To: <8f2a1c.uw@examplespecialty.example>
References: <desk.20481.1@thirdplane.example> <8f2a1c.uw@examplespecialty.example>
Date: Tue, 6 Oct 2026 09:14:07 -0500
From: Placement Desk <desk@thirdplane.example>
To: Underwriting <underwriting@examplespecialty.example>
Subject: Re: Sample Bakery LLC – BOP submission, eff. 11/01
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8

Following up on Friday's submission. Attached are the
prior loss runs you asked for. Can you confirm terms
by Thursday?`,
};

// A dark panel for the top of a Card, with the snippet fading out at its foot.
export function ChannelSnippet({ name }: { name: SnippetName }) {
  return (
    <pre
      className="m-0 aspect-video overflow-hidden rounded-t-2xl bg-deep p-3 pr-0 text-[0.5rem]/3 text-cream/80 text-shadow-glow"
      aria-hidden="true"
    >
      <code className="block h-full mask-b-from-60% font-mono">{SNIPPETS[name]}</code>
    </pre>
  );
}
