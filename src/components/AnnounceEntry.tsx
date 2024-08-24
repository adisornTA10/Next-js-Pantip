import Link from 'next/link';

type AnnounceEntryProps = {
  name: string;
  postUrl: string;
  imageUrl: string;
};

const AnnounceEntry = ({ name, postUrl, imageUrl }: AnnounceEntryProps) => (
  <Link href={postUrl}>
    <div className="flex cursor-pointer items-center transition-all duration-200 hover:bg-[#ffe2e5]">
      <div className="rounded-l-md bg-[#FF385C] px-2 py-1 text-sm font-bold text-white">
        Highlight
      </div>
      <div className="ml-2 flex items-center rounded-r-md border border-[#FF385C] bg-white px-2 py-1">
        <img src={imageUrl} alt={name} className="mr-2 size-8" />
        <p className="text-sm text-[#FF385C]">{name}</p>
      </div>
    </div>
  </Link>
);

export { AnnounceEntry };
