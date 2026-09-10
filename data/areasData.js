import songel from '../assets/img/songel.png';
import mongup from '../assets/img/mongup.png';
import thaomong from '../assets/img/thaomong.png';

const areas = {
   camLe: {
    name: "Quận Cẩm Lệ",
    locations: [
      {
        id: "camle-1",
        name: "Nailroom Quang Trung",
        address: "20 Quang Trung, Cẩm Lệ, Đà Nẵng",
        price: "200,000 VND",
        description: "Full service nail salon, offering gel nails and spa treatments.",
        services: [
          { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
          { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
          { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
        ],
        homeService: true,
        latlng: [16.0111, 108.2055]
      },
      {
        id: "camle-2",
        name: "Nailroom Lê Văn Hiến",
        address: "105 Lê Văn Hiến, Cẩm Lệ, Đà Nẵng",
        price: "150,000 VND",
        description: "Nail designs and polish for every occasion.",
        services: [
          { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
          { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
          { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
        ],
        homeService: false,
        latlng: [15.9998, 108.2167]
      },
      {
        id: "camle-3",
        name: "Nail Salon Cẩm Lệ",
        address: "45 Phạm Văn Đồng, Cẩm Lệ, Đà Nẵng",
        price: "180,000 VND",
        description: "Nail salon offering traditional and modern designs.",
        services: [
          { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
          { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
          { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
        ],
        homeService: true,
        latlng: [16.0400, 108.2233]
      },
      {
        id: "camle-4",
        name: "Nail Stylist Minh Anh",
        address: "12 Hoàng Văn Thụ, Cẩm Lệ, Đà Nẵng",
        price: "220,000 VND",
        description: "Expert nail stylist with personalized service.",
        services: [
          { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
          { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
          { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
        ],
        homeService: true,
        latlng: [16.0123, 108.2010]
      },
      {
        id: "camle-5",
        name: "Nailroom Hồng Hà",
        address: "33 Hùng Vương, Cẩm Lệ, Đà Nẵng",
        price: "250,000 VND",
        description: "Premium nail care and beauty services.",
        services: [
          { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
          { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
          { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
        ],
        homeService: false,
        latlng: [16.0444, 108.2100]
      }
    ]
  }
,
   haiChau: {
  name: "Quận Hải Châu",
  locations: [
    {
      id: "haichau-1",
      name: "Nailroom Hoàng Minh Giám",
      address: "29 N7B Trung Hòa - Nhân Chính, Thanh Xuân, Hà Nội",
      price: "210,000 VND",
      description: "High-end nail salon with professional nail care.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [21.0078, 105.7988]
    },
    {
      id: "haichau-2",
      name: "Hải Châu Nails",
      address: "23 Đường Duy Tân, Hải Châu, Đà Nẵng",
      price: "170,000 VND",
      description: "Affordable nail care with quick and stylish results.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0516, 108.2205]
    },
    {
      id: "haichau-3",
      name: "Nail Star Hải Châu",
      address: "91 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
      price: "190,000 VND",
      description: "Nail styling and beauty services for all occasions.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0603, 108.2135]
    },
    {
      id: "haichau-4",
      name: "Nailhouse Hoàng Anh",
      address: "10 Lê Duẩn, Hải Châu, Đà Nẵng",
      price: "230,000 VND",
      description: "Modern and luxurious nail salon with a wide variety of services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0700, 108.2200]
    },
    {
      id: "haichau-5",
      name: "Viva Nails Hải Châu",
      address: "56 Bạch Đằng, Hải Châu, Đà Nẵng",
      price: "260,000 VND",
      description: "A trendy spot for all nail art lovers.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0699, 108.2272]
    }
  ]
}

,
 sonTra: {
  name: "Quận Sơn Trà",
  locations: [
    {
      id: "sontra-1",
      name: "Simply Elegant Nail & Spa",
      address: "53 Hoàng Bích Sơn, Sơn Trà, Đà Nẵng",
      price: "270,000 VND",
      description: "Luxury spa with elegant nail services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0783, 108.2345]
    },
    {
      id: "sontra-2",
      name: "Lena Nails and Beauty",
      address: "89 Phạm Tu, Sơn Trà, Đà Nẵng",
      price: "180,000 VND",
      description: "Trendy nail designs and top-quality polish.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: false,
      latlng: [16.0681, 108.2448]
    },
    {
      id: "sontra-3",
      name: "Lou Nail – Korean Style & Retreat",
      address: "60 Nguyễn Bá Lân, Sơn Trà, Đà Nẵng",
      price: "260,000 VND",
      description: "Korean-style nail salon with cozy vibes.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0776, 108.2452]
    },
    {
      id: "sontra-4",
      name: "YaMe Nails",
      address: "204/14 Hải Phòng, Sơn Trà, Đà Nẵng",
      price: "200,000 VND",
      description: "Clean and colorful designs for modern women.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: false,
      latlng: [16.0698, 108.2291]
    },
    {
      id: "sontra-5",
      name: "EVA Nail & Beauty",
      address: "50 Xô Viết Nghệ Tĩnh, Sơn Trà, Đà Nẵng",
      price: "190,000 VND",
      description: "Affordable and elegant nail art services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0613, 108.2402]
    }
  ]
}

,
 nguHanhSon: {
  name: "Quận Ngũ Hành Sơn",
  locations: [
    {
      id: "nguhanhson-1",
      name: "Miss DN Nail & Gội Đầu Dưỡng Sinh",
      address: "114 Châu Thị Vĩnh Tế, Ngũ Hành Sơn, Đà Nẵng",
      price: "240,000 VND",
      description: "Nail spa with massage and wellness services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0395, 108.2412]
    },
    {
      id: "nguhanhson-2",
      name: "2T Nail & Beauty",
      address: "339 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng",
      price: "200,000 VND",
      description: "Reliable nail care and friendly staff.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: false,
      latlng: [16.0079, 108.2523]
    },
    {
      id: "nguhanhson-3",
      name: "Beach Side Nails & Massage Da Nang",
      address: "50 An Thượng 1, Ngũ Hành Sơn, Đà Nẵng",
      price: "250,000 VND",
      description: "Relaxing nail salon near the beach.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.039, 108.2445]
    },
    {
      id: "nguhanhson-4",
      name: "Nail Room – Mit’s House",
      address: "36 Nguyễn Thái Học, Ngũ Hành Sơn, Đà Nẵng",
      price: "210,000 VND",
      description: "Comfortable place with modern style.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: false,
      latlng: [16.0469, 108.2503]
    },
    {
      id: "nguhanhson-5",
      name: "Ka Ka Nails Salon & Beauty Spa",
      address: "392 Hùng Vương, Ngũ Hành Sơn, Đà Nẵng",
      price: "230,000 VND",
      description: "Professional team and wide range of services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0556, 108.2468]
    }
  ]
}

,
  lienChieu: {
  name: "Quận Liên Chiểu",
  locations: [
    {
      id: "lienchieu-1",
      name: "Nailroom Hoàng Ngân",
      address: "149 Hoàng Ngân, phường Trung Hòa, Cầu Giấy, Hà Nội",
      price: "220,000 VND",
      description: "Nail care salon with a relaxing ambiance.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0592, 108.1461]
    },
    {
      id: "lienchieu-2",
      name: "Liên Chiểu Nails",
      address: "12 Nguyễn An Ninh, Liên Chiểu, Đà Nẵng",
      price: "190,000 VND",
      description: "Offering a variety of nail services at competitive prices.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.075, 108.1512]
    },
    {
      id: "lienchieu-3",
      name: "Nail Tech Liên Chiểu",
      address: "88 Trường Chinh, Liên Chiểu, Đà Nẵng",
      price: "200,000 VND",
      description: "Specializing in professional nail care services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0673, 108.1557]
    },
    {
      id: "lienchieu-4",
      name: "Liên Chiểu Nail Studio",
      address: "54 Âu Cơ, Liên Chiểu, Đà Nẵng",
      price: "210,000 VND",
      description: "Beautiful nail art and spa services.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0908, 108.1385]
    },
    {
      id: "lienchieu-5",
      name: "Nail Style Liên Chiểu",
      address: "78 Nguyễn Tất Thành, Liên Chiểu, Đà Nẵng",
      price: "240,000 VND",
      description: "Trendy nail designs and rejuvenating treatments.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0816, 108.1503]
    }
  ]
}

,
  thanhKhe: {
  name: "Quận Thanh Khê",
  locations: [
    {
      id: "thanhkhe-1",
      name: "Thanh Khê Nails",
      address: "20 Đống Đa, Thanh Khê, Đà Nẵng",
      price: "210,000 VND",
      description: "Nail care services for all ages and occasions.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0726, 108.2048]
    },
    {
      id: "thanhkhe-2",
      name: "Nailroom Thanh Khê",
      address: "10 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng",
      price: "180,000 VND",
      description: "A comfortable spot for all nail care needs.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0604, 108.2102]
    },
    {
      id: "thanhkhe-3",
      name: "Nail Bar Thanh Khê",
      address: "45 Trường Chinh, Thanh Khê, Đà Nẵng",
      price: "190,000 VND",
      description: "Enjoy our nail bar while getting your nails done.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0672, 108.1929]
    },
    {
      id: "thanhkhe-4",
      name: "Thanh Khê Nail Art",
      address: "32 Hồ Tùng Mậu, Thanh Khê, Đà Nẵng",
      price: "200,000 VND",
      description: "Creative nail art services with custom designs.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0665, 108.2006]
    },
    {
      id: "thanhkhe-5",
      name: "Nailhouse Thanh Khê",
      address: "99 Lê Đình Dương, Thanh Khê, Đà Nẵng",
      price: "220,000 VND",
      description: "A professional nail studio with elegant nail designs.",
      services: [
        { name: "NHẶT DA - SƠN GEL", image: songel, price: "150,000 ₫", duration: "30 phút" },
        { name: "MÓNG ÚP - MÓNG BỘT - MÓNG GEL", image: mongup, price: "250,000 ₫", duration: "45 phút" },
        { name: "THÁO MÓNG - PHÁ SƠN", image: thaomong, price: "100,000 ₫", duration: "20 phút" }
      ],
      homeService: true,
      latlng: [16.0643, 108.2111]
    }
  ]
}


};



export default areas;