import axios from 'axios';
import { load } from 'cheerio';

export async function getPantipRoomLists() {
  try {
    const response = await axios.get('https://pantip.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });

    const $ = load(response.data);
    const roomlist: { title: string; subtitle: string; date: string; link: string; imageUrl: string }[] = [
      {
        title: 'ก้นครัว',
        subtitle: 'ร้านอาหาร สูตรอาหาร อาหารคาว อาหารหวาน เบเกอรี่ ไอศกรีม',
        date: '',
        link: 'https://pantip.com/forum/food',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-food.svg',
      },
      {
        title: 'กรีนโซน',
        subtitle: 'อนุรักษ์สิ่งแวดล้อม อนุรักษ์พลังงาน Green Living การออกแบบเพื่อสิ่งแวดล้อม ผลิตภัณฑ์รักษ์โลก เกษตรอินทรีย์',
        date: '',
        link: 'https://pantip.com/forum/greenzone',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-greenzone.svg',
      },
      {
        title: 'กรุงโซล',
        subtitle: 'K-POP ซีรีส์เกาหลี นักแสดงเกาหลี อาหารเกาหลี เที่ยวเกาหลี แฟชั่นเกาหลี ภาษาเกาหลี',
        date: '',
        link: 'https://pantip.com/forum/korea',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-korea.svg',
      },
      {
        title: 'กล้อง',
        subtitle: 'กล้องถ่ายรูป กล้อง DSLR กล้องวิดีโอ เทคนิคการถ่ายรูป',
        date: '',
        link: 'https://pantip.com/forum/camera',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-camera.svg',
      },
      {
        title: 'การ์ตูน',
        subtitle: 'การ์ตูนญี่ปุ่น การ์ตูนไทย การ์ตูนฝรั่ง อนิเมะ วาดการ์ตูน ของสะสมจากการ์ตูน คอสเพลย์',
        date: '',
        link: 'https://pantip.com/forum/cartoon',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-cartoon.svg',
      },
      {
        title: 'แก็ดเจ็ต',
        subtitle: 'Gadget, Action Camera, Drone, Game Console, Smartwatch, Smartband',
        date: '',
        link: 'https://pantip.com/forum/gadget',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-gadget.svg',
      },
      {
        title: 'แกลเลอรี่',
        subtitle: 'ภาพถ่ายบุคคล ภาพถ่ายทิวทัศน์ ภาพถ่ายมาโคร',
        date: '',
        link: 'https://pantip.com/forum/gallery',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-gallery.svg',
      },
      {
        title: 'ไกลบ้าน',
        subtitle: 'เรียนต่อต่างประเทศ ทำงานต่างประเทศ วีซ่า',
        date: '',
        link: 'https://pantip.com/forum/klaibann',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-klaibann.svg',
      },
      {
        title: 'จตุจักร',
        subtitle: 'สัตว์เลี้ยง สุนัข แมว ต้นไม้ จัดสวน ของสะสม งานฝีมือ เกษตรกรรม',
        date: '',
        link: 'https://pantip.com/forum/jatujak',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-jatujak.svg',
      },
      {
        title: 'เฉลิมกรุง',
        subtitle: 'นักร้องนักดนตรี เพลง เครื่องดนตรี คอนเสิร์ต มิวสิควิดีโอ',
        date: '',
        link: 'https://pantip.com/forum/chalermkrung',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-chalermkrung.svg',
      },
      {
        title: 'เฉลิมไทย',
        subtitle: 'ภาพยนตร์ ดาราภาพยนตร์ ค่ายหนัง เทศกาลหนัง หนังสั้น',
        date: '',
        link: 'https://pantip.com/forum/chalermthai',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-chalermthai.svg',
      },
      {
        title: 'ชานเรือน',
        subtitle: 'ครอบครัว ตั้งครรภ์ ตั้งชื่อลูก การเลี้ยงลูก การสอนลูก',
        date: '',
        link: 'https://pantip.com/forum/family',
        imageUrl: 'https://ptcdn.info/mobile/icon_room/pt-forum-family.svg',
      },
    ];

    // ปรับแก้โดยแทนที่ index ด้วย _
    $('div.pt-block.pt-block-purple-2.m-b-20 ul li').each((_, element) => {
      const title = $(element).find('h2 a strong').text().trim();
      const subtitle = $(element).find('h2 a').contents().not('strong').text().trim();
      const date = $(element).find('h2 a').text().trim().split(' ').pop();
      const link = $(element).find('h2 a').attr('href');
      const imageUrl = $(element).find('img').attr('src') || '';
      if (title && subtitle && date && link) {
        roomlist.push({
          title,
          subtitle,
          date,
          link: `https://pantip.com${link}`,
          imageUrl,
        });
      }
    });

    return roomlist;
  } catch (error) {
    console.error('Error fetching data from Pantip:', error);
    throw error;
  }
}
