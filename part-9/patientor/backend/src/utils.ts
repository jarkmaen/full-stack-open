/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, DiagnoseEntry, EntryType, NewBaseEntry, HealthCheckRating } from './types';

const assertNever = (value: any): any => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error('Incorrect or missing name');
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error('Incorrect or missing ssn');
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) throw new Error('Incorrect or missing occupation');
  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) throw new Error('Incorrect or missing description');
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) throw new Error('Incorrect or missing specialist');
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) throw new Error('Incorrect or missing employerName');
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) throw new Error('Incorrect or missing criteria');
  return criteria;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

/*const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }
  return entries;
};*/

const parseDiagnosisCodes = (codes: any): Array<DiagnoseEntry['code']> => {
  if (!codes) {
    throw new Error('Incorrect or missing codes: ' + codes);
  }
  return codes;
};

const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseType = (type: any): EntryType => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing entries: ' + type);
  }
  return type;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const parseSickLeave = (sick: any): { startDate: string, endDate: string; } => {
  if (!sick || !parseDate(sick.startDate) || !parseDate(sick.endDate)) {
    throw new Error('Incorrect or missing sick leave: ' + sick);
  }
  return sick;
};

const parseDischarge = (discharge: any): { date: string, criteria: string; } => {
  if (!discharge || !parseDate(discharge.date) || !parseCriteria(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown; };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newEntry;
};

type MoreFields = { description: unknown, date: unknown, specialist: unknown, type: unknown; };

export const toNewEntry = ({ description, date, specialist, type }: MoreFields, entry: any): NewEntry => {
  const newEntry: NewBaseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist)
  };
  parseType(type);
  switch (type) {
    case EntryType.Hospital:
      return {
        ...newEntry,
        discharge: parseDischarge(entry.discharge),
        type: EntryType.Hospital,
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...newEntry,
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave),
        type: EntryType.OccupationalHealthcare,
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
      };
    case EntryType.HealthCheck:
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        type: EntryType.HealthCheck
      };
    default:
      return assertNever(newEntry);
  }
};
