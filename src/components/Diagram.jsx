const playbook = [
  ['appetite', 'check'],
  ['carrier', 'shop'],
  ['submission', 'build'],
  ['status', 'notify'],
]

const outputs = ['Submission', 'Quote', 'Policy', 'Agency record']

export default function Diagram() {
  return (
    <figure className="diagram" aria-label="How a governed agent run flows from inbox to clean agency data">
      <div className="diagram__row">
        <div className="node">
          <span className="node__label">Inbox</span>
          <div className="node__lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="tag">Trigger</span>
        </div>

        <div className="diagram__arrow" aria-hidden="true">
          →
        </div>

        <div className="node">
          <span className="node__label">Playbook</span>
          <ul className="kv">
            {playbook.map(([key, value]) => (
              <li key={key}>
                <span>{key}:</span>
                <b>{value}</b>
              </li>
            ))}
          </ul>
          <span className="tag tag--solid">Governed</span>
        </div>
      </div>

      <div className="diagram__down" aria-hidden="true">
        ↓
      </div>

      <div className="diagram__panel">
        <span className="diagram__label">Clean agency data — every run</span>
        <div className="diagram__chips">
          {outputs.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="diagram__foot">
        <span className="diagram__label">Runs on Alpine</span>
        <span>Auditable · Governable · Secure</span>
      </figcaption>
    </figure>
  )
}
