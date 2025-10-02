import { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails= ({ entry }: { entry: Entry; }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <div>{entry.date} / HOSPITAL</div>
          <div>discharge date: {entry.discharge.date}</div>
          <div>criteria: {entry.discharge.criteria}</div>
          <div>{entry.description}</div>
          <div>diagnose by: {entry.specialist}</div>
          <div>--------------------------------------------------</div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <div>{entry.date} / OCCUPATIONAL HEALTHCARE ({entry.employerName})</div>
          <div>{entry.description}</div>
          <div>diagnose by: {entry.specialist}</div>
          <div>--------------------------------------------------</div>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <div>{entry.date} / HEALTH CHECK</div>
          <div>{entry.description}</div>
          <div>health check score: {entry.healthCheckRating}</div>
          <div>diagnose by: {entry.specialist}</div>
          <div>--------------------------------------------------</div>
        </div>
      );
    default:
      return assertNever(entry);
  }
  /*
  return (
    <div>
      <span>{entry.date} <em>{entry.description}</em></span>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {Object.values(diagnoses).filter((item) => item.code.includes(code))[0]?.name}
          </li>
        ))}
      </ul>
    </div>
  );
  */
};

export default EntryDetails;
