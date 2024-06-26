import { useQuery } from "@tanstack/react-query";

export type Entry = {
  id: string;
  idiom: string;
  meaning: string;
  origin: string;
  examples: string[];
  synonyms: string[];
  source: string;
  author: string;
};

const endpoint = process.env.API_BASE_URL as string;

export const useIdioms = () => {
  const fetchIdioms = async (): Promise<Entry[]> => {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const fetchIdiomById = async (id: string): Promise<Entry> => {
    const response = await fetch(`${endpoint}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const getIdioms = () =>
    useQuery<Entry[], Error>({ queryKey: ["idioms"], queryFn: fetchIdioms });
  const getIdiomById = (id: string) =>
    useQuery<Entry, Error>({
      queryKey: ["idiomById", id],
      queryFn: () => fetchIdiomById(id),
    });
    return { getIdioms, getIdiomById, fetchIdioms, fetchIdiomById };
  };
