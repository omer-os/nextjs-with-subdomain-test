import Image from "next/image";
import { restaurants } from "../../restaurants";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-2">
        {restaurants.map((restaurant) => (
          <Link
            href={`/${restaurant.subdomain}`}
            key={restaurant.subdomain}
            className="flex gap-2 items-center"
          >
            {restaurant.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
