import { placementDesk } from "../data/content";
import { Arrow } from "./Ui";

// The Placement Desk's three stages, from work going in to results coming
// back, with the steps under each. Shown on the homepage and on
// /placement-desk; each page supplies its own heading.
export function PlacementWorkflow() {
  return (
    <div className="flow flow--dark" data-reveal>
      {placementDesk.work.stages.map((stage, i) => (
        <div
          className={stage.accent ? "flow__col flow__col--accent" : "flow__col"}
          key={stage.kicker}
        >
          {i > 0 ? <Arrow className="flow__arrow" /> : null}
          <p className="flow__kicker">{stage.kicker}</p>
          <ul className="flow__list">
            {stage.steps.map((step) => (
              <li key={step.title}>
                <p className="flow__item-title">{step.title}</p>
                <p className="flow__item-body">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
