import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface Props {
  id: string;
  author: string;
  authorEmail?: string;
  date: string;
  thumbnail?: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
}

export default function Post({
  id,
  author,
  authorEmail,
  date,
  thumbnail,
  title,
  content,
  links,
  category,
}: Props) {
  const isEditable = true;

  return (
    <div className="my-4 border-b-300 border-b py-8">
      <div className="mb-4">
        Posted by: <span className="font-bold">{author}</span> on {date}
      </div>

      <div className="w-full h-72 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        ) : (
          <Image
            src={"/thumbnail-placeholder.png"}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        )}
      </div>
      {category && (
        <Link
          className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
          href={`/categories/${category}`}
        >
          {category}
        </Link>
      )}
      <h2>{title}</h2>
      <p className="content">{content}</p>

      {links && (
        <div className="my-4 flex flex-col gap-3">
          {links.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>

              <Link className="link" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}
      {isEditable && (
        <div className="flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton />
        </div>
      )}
    </div>
  );
}
