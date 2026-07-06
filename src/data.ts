import { PortfolioItem } from './types';

// Let's use the exact names of the generated images we generated for outstanding accuracy
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'b1',
    title: 'The Royal Peacocks Bridal Blouse',
    category: 'blouses',
    image: '/src/assets/images/designer_blouse_jacket_embroidery_1783349701893.jpg',
    description: 'A masterpiece on raw red silk with heavy Zardosi and maggam work featuring intricate symmetrical dancing peacock designs.',
    details: [
      'Heavy Zardosi back-neck design',
      'Elbow sleeves with hand-carved floral jaal',
      'Accented with real pearls, kundan stones, and gold beads',
      'Matching custom side tassels (Dori latkan)'
    ]
  },
  {
    id: 'j1',
    title: 'Gilded Banarasi Silk Jacket',
    category: 'jackets',
    image: '/src/assets/images/handcrafting_artisan_embroidery_1783349716437.jpg',
    description: 'An ethereal luxury ethnic jacket with rich Aari needlework and fine gold threads handcrafted over rich Banarasi violet fabric.',
    details: [
      'All-over floral vine hand needlework',
      'Royal mandarin collar with fine gold piping',
      'Exquisite gemstone-encrusted cuff work',
      'Perfect styling piece for bridal skirts and saris'
    ]
  },
  {
    id: 's1',
    title: 'Crimson Heritage Sari Border',
    category: 'saris',
    image: '/src/assets/images/hero_bridal_saree_embroidery_1783349684763.jpg',
    description: 'A breathtakingly detailed gold-braided boundary crafted for a royal wedding sari, featuring heritage Indian creepers.',
    details: [
      'Pure gold Zari metal threads',
      'Double border cutwork with scalloped edges',
      'Interspersed with micro-bead clusters and rubies',
      'Handcrafted border width: 4.5 inches'
    ]
  },
  {
    id: 'b2',
    title: 'The Floral Vine Illusion Blouse',
    category: 'blouses',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant high-neck net blouse with intricate ivory thread-work creating a delicate leaf pattern on a transparent skin-tone mesh.',
    details: [
      'Delicate single-thread chain stitching',
      'Exquisite pearl bead borders',
      'Button-down back with embroidered loops',
      'Lightweight and versatile design'
    ]
  },
  {
    id: 'l1',
    title: 'The Rajkumari Wedding Lehenga',
    category: 'lehengas',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    description: 'A lavish velvet lehenga skirt heavily detailed with double-needle traditional Maggam work depicting ancient royal palace arches.',
    details: [
      '12-kali heavy flares embellished with zari',
      'Rich multi-colored silk thread highlights',
      'Over 200 hours of precision handcrafting',
      'Complete with matching double-dupattas'
    ]
  },
  {
    id: 's2',
    title: 'Emerald Vine Pure Georgette Pallu',
    category: 'saris',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Fine scalloped-edge embroidery with glistening silver sequins and emerald stones on a flowing lightweight georgette sari.',
    details: [
      'Glistening silver Zardosi work',
      'Emerald-green glass bead embellishments',
      'Dainty corner tassels (latkans)',
      'Sophisticated and modern party wear'
    ]
  }
];

export const occasionOptions = [
  'Wedding / Bridal',
  'Reception / Engagement',
  'Festive (Diwali, Eid, Puja)',
  'Mehndi / Sangeet Ceremony',
  'Formal Party / Dinner',
  'Casual / Everyday Luxury'
];

export const fabricOptions = [
  'Kanjeevaram / Pure Silk',
  'Raw Silk',
  'Banarasi Brocade',
  'Georgette / Chiffon',
  'Velvet',
  'Net / Organza'
];

export const blouseStyleOptions = [
  'Elbow-length sleeve with deep U-neck',
  'Short sleeve with sweet-heart neck',
  'Puff/Princess sleeve with boat neck',
  'High-collar neck with keyhole back',
  'Sleeveless/Choli style with strap embroidery',
  'Full-length sleeve with sheer back-net work'
];

export const coverageOptions = [
  { value: 'minimal', label: 'Minimal / Neckline Only (Elegant simple border along neckline)', factor: 1.0, timeline: '4-6 Days' },
  { value: 'medium', label: 'Medium Work (Neckline + dainty back-neck motif + sleeve borders)', factor: 1.8, timeline: '7-10 Days' },
  { value: 'heavy', label: 'Heavy Bridal Work (Full back-neck design, full sleeves, heavy motifs)', factor: 3.2, timeline: '12-15 Days' },
  { value: 'royal', label: 'Royal Masterpiece (Completely filled Zardosi & stone jaal, zero gap work)', factor: 5.0, timeline: '18-25 Days' }
];

export const garmentOptions = [
  { value: 'bridal_blouse', label: 'Bridal Blouse / Jacket', basePrice: 2500 },
  { value: 'saree_border', label: 'Saree Border & Pallu (Complete 5.5 meters)', basePrice: 6000 },
  { value: 'lehenga_blouse', label: 'Lehenga Blouse & Skirt Borders', basePrice: 8000 },
  { value: 'ethnic_jacket', label: 'Full-length Designer Jacket', basePrice: 5000 }
];

export const embroideryTypeOptions = [
  { value: 'zardosi', label: 'Traditional Zardosi (Metallic gold thread)', basePrice: 1500 },
  { value: 'aari_maggam', label: 'Aari / Maggam Needlework (Beads & pearls)', basePrice: 1200 },
  { value: 'cutwork', label: 'Cutwork / Scalloping (Intricate borders)', basePrice: 1800 },
  { value: 'kundan_stone', label: 'Kundan & Gemstone Embellishment', basePrice: 2000 },
  { value: 'thread_silk', label: 'Multicolor Silk Thread Embroidery', basePrice: 1000 }
];
