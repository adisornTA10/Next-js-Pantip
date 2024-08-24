import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { MdOutlineGroups } from 'react-icons/md';

import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('RootLayout');

  return (
    <BaseTemplate
      leftNav={(
        <>
          <img
            src="https://ptcdn.info/mobile/logo-mobile-pantip-white.png"
            alt="logo"
            className="r-0 h-8 p-0 brightness-[102%] contrast-[101%] hue-rotate-[325deg] invert-[58%] saturate-[2031%] sepia-[27%]"
          />
        </>
      )}
      searchBar={(
        <input
          type="text"
          placeholder="ค้นหาบน Pantip"
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          // endContent={<Image src={searchIcon} alt={""} className="h-5 w-5"/>
        />
      )}
      rightNav={(
        <>
          <li className="hidden cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-black hover:underline md:flex">
            <BiMessageRoundedAdd />
            <Link href="/create-post">
              <span className="whitespace-nowrap">{t('create_post_link')}</span>
            </Link>
          </li>
          <li className="hidden cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-black hover:underline md:flex">
            <MdOutlineGroups />
            <Link href="/community">
              <span className="whitespace-nowrap">{t('community_link')}</span>
            </Link>
          </li>
          <li className="hidden cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-black hover:underline md:flex">
            <Link href="/sign-in/">
              <p className="whitespace-nowrap">{t('sign_in_link')}</p>
            </Link>
          </li>
          <li className="hidden cursor-pointer items-center gap-1 transition-colors duration-200 hover:text-black hover:underline md:flex">
            <Link href="/sign-up/">
              <p className="whitespace-nowrap">{t('sign_up_link')}</p>
            </Link>
          </li>

        </>
      )}
    >
      <div className="text-xl [&_p]:my-6">{props.children}</div>
    </BaseTemplate>
  );
}
