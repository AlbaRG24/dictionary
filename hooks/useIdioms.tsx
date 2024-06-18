import { QueryKey, useQuery } from "@tanstack/react-query";

export type Entry = {
  id: string;
  idiom: string;
  meaning: string;
  origin?: string;
  examples: string[];
  synonyms?: string[];
  source: string;
  author: string;
};

const idiomsUrl = "http://localhost:4000/idioms"

export const fetchIdioms = async (): Promise<Entry[]> => {
  const response = await fetch(idiomsUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchIdiomById = async (id: string): Promise<Entry> => {
  const response = await fetch(`${idiomsUrl}/${id}`);
  return response.json();
};

export const useIdioms = () => {
  const getIdioms = () => useQuery<Entry[], Error>(["idioms"], fetchIdioms);
  const getIdiomById = (id: string) =>
    useQuery<Entry, Error>({
      queryKey: ["idiomById", id] as QueryKey,
      queryFn: () => fetchIdiomById(id),
    });
  return { getIdioms, getIdiomById, fetchIdioms, fetchIdiomById };
};
