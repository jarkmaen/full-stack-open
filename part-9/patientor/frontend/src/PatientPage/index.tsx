import axios from "axios";
import React from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { apiBaseUrl } from "../constants";
import { Diagnosis, HealthCheckEntry, Patient } from "../types";
import { useParams } from "react-router-dom";
import { setPatient, useStateValue, setDiagnosisList, addEntry } from "../state";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "./AddEntryForm";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string; }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${String(id)}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (axios.isAxiosError(error) && error.response) {
          errorMessage += ` Error: ${String(error.response.data.message)}`;
        }
        console.error(errorMessage);
      }
    };
    void fetchPatient();
  }, [dispatch]);
  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (axios.isAxiosError(error) && error.response) {
          errorMessage += ` Error: ${String(error.response.data.message)}`;
        }
        console.error(errorMessage);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${String(id)}`
      );
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${String(id)}/entries`,
        values
      );
      dispatch(addEntry(patientFromApi, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  if (!patient) {
    return (
      <div>Something went wrong...</div>
    );
  }
  return (
    <div>
      <div>
        <h2>{patient?.name} {patient?.gender === 'male' ? (<MaleIcon />) : (<FemaleIcon />)}</h2>
      </div>
      <div>
        ssn: {patient?.ssn}
      </div>
      <div>
        occupation: {patient?.occupation}
      </div>
      <div>
        <h3>entries</h3>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
