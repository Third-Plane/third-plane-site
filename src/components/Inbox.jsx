import { proof } from '../content'

export default function Inbox() {
  const { inbox } = proof

  return (
    <figure
      className="inbox"
      data-reveal
      aria-label="QuoteWell Inbox thread: an agent drafts a submission from email context, matches carriers, and waits for the broker to send"
    >
      <div className="inbox__chrome">
        <p className="inbox__app">{inbox.app}</p>
        <dl className="inbox__meta">
          <div>
            <dt>From</dt>
            <dd>{inbox.from}</dd>
          </div>
          <div>
            <dt>Subject</dt>
            <dd>{inbox.subject}</dd>
          </div>
        </dl>
      </div>

      <div className="inbox__body">
        <p className="inbox__playbook">{inbox.playbook}</p>
        <ul className="inbox__rows">
          {inbox.rows.map((row) => (
            <li className="inbox__row" key={row.text}>
              <span className="inbox__status" data-status={row.status}>
                <i className="inbox__dot" aria-hidden="true" />
                {row.status}
              </span>
              <span className="inbox__text">{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
