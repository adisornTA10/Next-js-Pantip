import axios from 'axios';
import { load } from 'cheerio';

export async function getPantipAnnouncements() {
  try {
    const response = await axios.get('https://pantip.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });

    const $ = load(response.data);
    const announcements: { title: string; subtitle: string; date: string; link: string; imageUrl: string }[] = [
      {
        title: '[Pantip Point] ชวนแชร์เรื่องราวประทับใจของสัตว์เลี้ยงแสนรัก 🐶🐱❤️',
        subtitle: '',
        date: '2024-08-01',
        link: 'https://pantip.com/s/tkQmv',
        imageUrl: 'https://ptcdn.info/home_highlight/2024-08/66ab0f05caac0a8b331e8faa_bw046w5xka_200.png',
      },
      {
        title: '🎧 PANTIP PODCAST 🎧 3 อันดับกระทู้ฮิตบนพันทิปประจำวัน 📊',
        subtitle: '',
        date: '2024-10-22',
        link: 'https://pantip.com/s/rKCro',
        imageUrl: 'https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_200.jpg',
      },
      // {
      //   title: '🚩 กิจกรรมแชร์ “หนัง/ละคร/ซีรีส์ ในกระแส ที่กำลังชม และดูผ่านอุปกรณ์ใด” ตอบถูกใจ รับ Pantip point 50 คะแนน 🚩',
      //   subtitle: '',
      //   date: '2024-08-15',
      //   link: 'https://pantip.com/s/vbwUQ',
      //   imageUrl: 'https://ptcdn.info/home_highlight/2024-08/66bc2f5ecaac0a286a21be63_ch8hwxrwu7_200.jpg',
      // },
      // {
      //   title: '📌 พี่แป้งชวนรีวิว “มอยส์ตัวตึง..ที่หนึ่งในใจ“ รับ Pantip Point มอยส์บำรุงผิว ของที่ระลึกน้องเพี้ยน 🌵',
      //   subtitle: '',
      //   date: '2024-07-25',
      //   link: 'https://pantip.com/s/kWpr8',
      //   imageUrl: 'https://ptcdn.info/home_highlight/2024-07/66a21fc7caac0a0ab02e3d44_c64is564sx_200.png',
      // },
      // {
      //   title: 'ชวนร่วมกิจกรรม บันทึกทริปกับ “TripNote (Beta Version)” 📱🧳✈️',
      //   subtitle: '',
      //   date: '2024-08-17',
      //   link: 'https://pantip.com/s/UQHSo',
      //   imageUrl: 'https://ptcdn.info/home_highlight/2024-08/66beecabcaac0acb794dd705_uogi5ykul3_200.jpg',
      // },
      // {
      //   title: 'บทสรุป ‘เกมบอล’ 2024',
      //   subtitle: '',
      //   date: '2024-08-18',
      //   link: 'https://pantip.com/s/sWWg8',
      //   imageUrl: 'https://ptcdn.info/home_highlight/2024-08/66b45613caac0aa3df0dc974_a1ggje23c3_200.png',
      // },
      // {
      //   title: 'พันทิปนานุกรม … ชวนมาดู Cover Design วันสำคัญ บนเว็บไซต์ Pantip',
      //   subtitle: '',
      //   date: '2023-09-10',
      //   link: 'https://pantip.com/topic/41930072',
      //   imageUrl: 'https://ptcdn.info/home_highlight/2023-09/64f586c3caac0a43be1e9c04_ohwbqfbnf2_200.jpg',
      // },
    ];
    $('div.pt-block.pt-block-purple-2.m-b-20 ul li').each((_, element) => {
      const title = $(element).find('h2 a strong').text().trim();
      const subtitle = $(element).find('h2 a').contents().not('strong').text().trim();
      const date = $(element).find('h2 a').text().trim().split(' ').pop();
      const link = $(element).find('h2 a').attr('href');
      const imageUrl = $(element).find('img').attr('src') || '';

      if (title && subtitle && date && link) {
        announcements.push({
          title,
          subtitle,
          date,
          link: `https://pantip.com${link}`,
          imageUrl,
        });
      }
    });

    return announcements;
  } catch (error) {
    console.error('Error fetching data from Pantip:', error);
    throw error;
  }
}
