import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import AnnounceList from '@/components/AnnounceList';
import HighlighList from '@/components/Highligh';
import PantipPickList from '@/components/PantipPick';
import RoomList from '@/components/RoomList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <img
        className="m-0 w-full p-0"
        src="https://ptcdn.info/doodle/2024/5d07273900d01f33da0f618c_kltlxiu7k8.png"
        alt="Pantip Doodle"
      />

      {/* ส่วน Announce */}
      <div className="mx-auto mt-2 max-w-3xl rounded-lg border border-gray-300 bg-white shadow-lg">
        <div className="flex items-center justify-between rounded-t-lg bg-[#FF385C] px-4 py-2 font-semibold text-white">
          <span>Announce</span>
        </div>
        <AnnounceList />
      </div>

      {/* ส่วนเลือกห้อง (RoomList) */}
      <div className="mx-auto mt-2 max-w-3xl rounded-lg border border-gray-300 bg-white shadow-lg">
        <div className="flex items-center justify-between rounded-t-lg bg-[#FF385C] px-4 py-2 font-semibold text-white">
          <span>เลือกห้อง</span>
        </div>
        <RoomList />
      </div>

      {/* ส่วนเลือกห้อง (RoomList) */}
      <div className="mx-auto mt-2 max-w-3xl rounded-lg border border-gray-300 bg-white shadow-lg">
        <div className="flex items-center justify-between rounded-t-lg bg-[#FF385C] px-4 py-2 font-semibold text-white">
          <span>Highlight</span>
        </div>
        <HighlighList />
      </div>

      {/* ส่วนเลือกห้อง (RoomList) */}
      <div className="mx-auto mt-2 max-w-3xl rounded-lg border border-gray-300 bg-white shadow-lg">
        <div className="flex items-center justify-between rounded-t-lg bg-[#FF385C] px-4 py-2 font-semibold text-white">
          <span>Pantip Pick</span>
        </div>
        <PantipPickList />
      </div>
    </>
  );
}
