import { sanityClient } from "@/lib/sanity/api/client";
import { Person } from '@/services/sanity/persons/types/Person';

interface PersonPageProps {
  params: { slug: string };
}

// Generate static paths for SSG
export async function generateStaticParams() {
  const Persons: Person[] = await sanityClient.fetch(`*[_type == "Person"]{ slug }`);
  return Persons.map((Person) => ({ slug: Person.slug.current }));
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params;

  const Person: Person | null = await sanityClient.fetch(
    `*[_type == "person" && slug.current == $slug][0]`,
    { slug }
  );

  if (!Person) return <p>Person not found</p>;

  return (
    <div>
      <h1>
        {
          Person.title
        }
      </h1>
      <div>
        {
          Person?.name
        }
      </div>
    </div>
  );
}
