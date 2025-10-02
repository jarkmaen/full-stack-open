import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatientById = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEntry = (patient: any, entry: NewEntry): NewEntry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  patient.entries.push(newEntry);
  return entry;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  findPatientById,
  addEntry
};
