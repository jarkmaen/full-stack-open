import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart; }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <div>
            <b>{part.name} {part.exerciseCount}</b>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
        </div>
      );
    case "groupProject": {
      return (
        <div>
          <div>
            <b>{part.name} {part.exerciseCount}</b>
          </div>
          <div>
            project exercises {part.groupProjectCount}
          </div>
        </div>
      );
    }
    case "submission": {
      return (
        <div>
          <div>
            <b>{part.name} {part.exerciseCount}</b>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>
            submit to {part.exerciseSubmissionLink}
          </div>
        </div>
      );
    }
    case "special": {
      return (
        <div>
          <div>
            <b>{part.name} {part.exerciseCount}</b>
          </div>
          <div>
            <em>{part.description}</em>
          </div>
          <div>
            required skills: {part.requirements.map((requirement) => <span key={requirement}>{requirement} </span>)}
          </div>
        </div>
      );
    }
    default:
      return assertNever(part);
  }
};

export default Part;
