/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';

const router = express.Router();

import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';
import { toNewEntry } from '../utils';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (!patient) {
    res.status(204).end();
  } else {
    res.json(patient);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (!patient) {
    res.status(204).end();
  }
  try {
    const newEntry = toNewEntry(req.body, req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
