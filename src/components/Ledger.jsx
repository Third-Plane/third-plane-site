import { useEffect, useRef, useState } from 'react'
import { hero, ledger } from '../content'

// A slowly cycling record of desk activity. Two statuses only: work the desk
// completed, and work it returned to a person. The script is fixed and uses
// placeholder names, so it can never be read as real client data.
const VISIBLE = 5
const fmt = (ms) => new Date(ms).toTimeString().slice(0, 5)

export default function Ledger() {
  const { label, sublabel, legend } = hero.ledger
  const counter = useRef(VISIBLE)
  const [rows, setRows] = useState(() => {
    const now = Date.now()
    return ledger.slice(0, VISIBLE).map((entry, i) => ({
      ...entry,
      key: i,
      time: fmt(now - (VISIBLE - 1 - i) * 47000),
    }))
  })

  useEffect(() => {
    let timer
    const tick = () => {
      const next = { ...ledger[counter.current % ledger.length], key: counter.current, time: fmt(Date.now()) }
      counter.current += 1
      setRows((prev) => [...prev.slice(1), next])
      timer = setTimeout(tick, 3800 + Math.random() * 2400)
    }
    timer = setTimeout(tick, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <figure className="ledger" aria-label="Placement Desk activity: work received, worked across carrier channels, and returned to a person">
      <div className="ledger__head">
        <div>
          <p className="ledger__label">{label}</p>
          <p className="ledger__sublabel">{sublabel}</p>
        </div>
        <span className="ledger__live">
          <i aria-hidden="true" />
          Working
        </span>
      </div>

      <ol className="ledger__rows">
        {rows.map(({ key, time, task, status }) => (
          <li key={key} className="ledger__row" data-status={status}>
            <span className="ledger__time">{time}</span>
            <span className="ledger__task">{task}</span>
            <i className="ledger__dot" aria-hidden="true" />
          </li>
        ))}
      </ol>

      <ul className="ledger__legend">
        {legend.map((item) => (
          <li key={item.status} data-status={item.status}>
            <i aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </figure>
  )
}
