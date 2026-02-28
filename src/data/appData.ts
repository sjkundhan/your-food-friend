export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number; // in minutes
  address: string;
  phone: string;
  openTime: string;
  closeTime: string;
  image: string;
  priceForTwo: number;
  isRecommended?: boolean;
  isNew?: boolean;
  offer?: string;
}

export interface Dish {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  price: number;
  rating: number;
  deliveryTime: number;
  image: string;
  category: string;
  description: string;
  isMostOrdered?: boolean;
  isFamous?: boolean;
  isVeg: boolean;
}

export interface DeliveryBoy {
  name: string;
  phone: string;
  age: number;
  photo: string;
  rating: number;
}

export interface Order {
  id: string;
  dish: Dish;
  status: "preparing" | "picked" | "on_the_way" | "delivered";
  orderedAt: string;
  deliveryBoy: DeliveryBoy;
  estimatedMinutes: number;
  address: string;
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Barbeque Nation",
    cuisine: "North Indian, BBQ, Mughlai",
    rating: 4.7,
    deliveryTime: 35,
    address: "12, MG Road, Bengaluru, Karnataka 560001",
    phone: "+91 80 4112 2200",
    openTime: "12:00 PM",
    closeTime: "11:00 PM",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    priceForTwo: 1200,
    isRecommended: true,
    offer: "40% off up to ₹120",
  },
  {
    id: "r2",
    name: "Haldiram's",
    cuisine: "North Indian, Sweets, Snacks",
    rating: 4.5,
    deliveryTime: 25,
    address: "Plot 1, Sector 18, Noida, UP 201301",
    phone: "+91 120 430 1234",
    openTime: "08:00 AM",
    closeTime: "10:30 PM",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80",
    priceForTwo: 400,
    isRecommended: true,
    offer: "Free delivery",
  },
  {
    id: "r3",
    name: "Saravana Bhavan",
    cuisine: "South Indian, Tiffins",
    rating: 4.6,
    deliveryTime: 20,
    address: "7, Anna Salai, Chennai, Tamil Nadu 600002",
    phone: "+91 44 2851 6000",
    openTime: "06:00 AM",
    closeTime: "11:00 PM",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80",
    priceForTwo: 300,
    isRecommended: false,
    isNew: true,
    offer: "20% off",
  },
  {
    id: "r4",
    name: "Domino's Pizza",
    cuisine: "Pizza, Italian, Fast Food",
    rating: 4.3,
    deliveryTime: 30,
    address: "46, Linking Road, Bandra, Mumbai 400050",
    phone: "+91 22 6730 8000",
    openTime: "10:00 AM",
    closeTime: "12:00 AM",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
    priceForTwo: 600,
    offer: "Buy 1 Get 1",
  },
  {
    id: "r5",
    name: "Biryani Blues",
    cuisine: "Biryani, Hyderabadi, Mughlai",
    rating: 4.8,
    deliveryTime: 40,
    address: "3, Cyber Hub, DLF Phase 2, Gurgaon 122002",
    phone: "+91 124 413 5000",
    openTime: "11:00 AM",
    closeTime: "11:30 PM",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    priceForTwo: 700,
    isRecommended: true,
    offer: "30% off on first order",
  },
  {
    id: "r6",
    name: "The Bombay Canteen",
    cuisine: "Modern Indian, Continental",
    rating: 4.4,
    deliveryTime: 45,
    address: "Process House, Kamala Mills, Lower Parel, Mumbai 400013",
    phone: "+91 22 4966 6666",
    openTime: "12:00 PM",
    closeTime: "10:30 PM",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    priceForTwo: 1500,
    isNew: true,
  },
  {
    id: "r7",
    name: "Punjabi Rasoi",
    cuisine: "Punjabi, Tandoor, Dhabha",
    rating: 4.2,
    deliveryTime: 30,
    address: "88, Sector 17, Chandigarh 160017",
    phone: "+91 172 270 4455",
    openTime: "09:00 AM",
    closeTime: "11:00 PM",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    priceForTwo: 500,
    offer: "Free Lassi on orders above ₹399",
  },
  {
    id: "r8",
    name: "Vaango",
    cuisine: "South Indian, Kerala, Chettinad",
    rating: 4.1,
    deliveryTime: 25,
    address: "Phoenix Marketcity, Whitefield, Bengaluru 560066",
    phone: "+91 80 4902 5000",
    openTime: "07:00 AM",
    closeTime: "10:00 PM",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=600&q=80",
    priceForTwo: 350,
    isNew: true,
  },
];

export const dishes: Dish[] = [
  {
    id: "d1", name: "Chicken Handi Biryani", restaurantId: "r5", restaurantName: "Biryani Blues",
    price: 349, rating: 4.9, deliveryTime: 40, isVeg: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80",
    category: "Biryani", description: "Slow-cooked in a sealed pot with saffron, whole spices & tender chicken",
    isMostOrdered: true, isFamous: true,
  },
  {
    id: "d2", name: "Butter Chicken", restaurantId: "r1", restaurantName: "Barbeque Nation",
    price: 429, rating: 4.8, deliveryTime: 35, isVeg: false,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80",
    category: "Main Course", description: "Tender chicken in rich, creamy tomato gravy with aromatic spices",
    isMostOrdered: true, isFamous: true,
  },
  {
    id: "d3", name: "Masala Dosa", restaurantId: "r3", restaurantName: "Saravana Bhavan",
    price: 129, rating: 4.7, deliveryTime: 20, isVeg: true,
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&q=80",
    category: "South Indian", description: "Crispy golden crepe stuffed with spiced potato filling",
    isMostOrdered: true, isFamous: true,
  },
  {
    id: "d4", name: "Farmhouse Pizza", restaurantId: "r4", restaurantName: "Domino's Pizza",
    price: 449, rating: 4.5, deliveryTime: 30, isVeg: true,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    category: "Pizza", description: "Loaded with fresh veggies, mozzarella cheese on thick crust",
    isMostOrdered: false, isFamous: true,
  },
  {
    id: "d5", name: "Dal Makhani", restaurantId: "r7", restaurantName: "Punjabi Rasoi",
    price: 249, rating: 4.6, deliveryTime: 30, isVeg: true,
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&q=80",
    category: "Main Course", description: "Slow-cooked black lentils in tomato butter cream sauce",
    isMostOrdered: true, isFamous: true,
  },
  {
    id: "d6", name: "Idli Sambar Combo", restaurantId: "r8", restaurantName: "Vaango",
    price: 89, rating: 4.4, deliveryTime: 25, isVeg: true,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&q=80",
    category: "South Indian", description: "Steamed rice cakes with piping hot sambar & coconut chutney",
    isMostOrdered: false, isFamous: true,
  },
  {
    id: "d7", name: "Paneer Tikka", restaurantId: "r1", restaurantName: "Barbeque Nation",
    price: 329, rating: 4.7, deliveryTime: 35, isVeg: true,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80",
    category: "Starters", description: "Marinated cottage cheese grilled to perfection with bell peppers",
    isMostOrdered: false, isFamous: true,
  },
  {
    id: "d8", name: "Kaju Katli", restaurantId: "r2", restaurantName: "Haldiram's",
    price: 499, rating: 4.8, deliveryTime: 25, isVeg: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
    category: "Sweets", description: "Premium diamond-shaped cashew fudge with silver foil",
    isMostOrdered: true, isFamous: true,
  },
  {
    id: "d9", name: "Modern Thaali", restaurantId: "r6", restaurantName: "The Bombay Canteen",
    price: 899, rating: 4.5, deliveryTime: 45, isVeg: false,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80",
    category: "Thali", description: "A curated Indian meal with seasonal ingredients and modern twists",
    isMostOrdered: false, isFamous: true,
  },
  {
    id: "d10", name: "Hyderabadi Dum Biryani", restaurantId: "r5", restaurantName: "Biryani Blues",
    price: 299, rating: 4.8, deliveryTime: 40, isVeg: false,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&q=80",
    category: "Biryani", description: "Authentic dum biryani with aged basmati rice & fragrant spices",
    isMostOrdered: false, isFamous: true,
  },
  {
    id: "d11", name: "Pepperoni Passion Pizza", restaurantId: "r4", restaurantName: "Domino's Pizza",
    price: 549, rating: 4.3, deliveryTime: 30, isVeg: false,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&q=80",
    category: "Pizza", description: "Double pepperoni with extra cheese and oregano seasoning",
    isMostOrdered: true, isFamous: false,
  },
  {
    id: "d12", name: "Gajar Halwa", restaurantId: "r2", restaurantName: "Haldiram's",
    price: 149, rating: 4.6, deliveryTime: 25, isVeg: true,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&q=80",
    category: "Desserts", description: "Classic carrot pudding slow-cooked with milk, ghee and dry fruits",
    isMostOrdered: false, isFamous: false,
  },
];

export const deliveryBoy: DeliveryBoy = {
  name: "Rajan Sharma",
  phone: "+91 98765 43210",
  age: 24,
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  rating: 4.8,
};

export const sampleOrders: Order[] = [
  {
    id: "ord001",
    dish: dishes[0],
    status: "on_the_way",
    orderedAt: "2024-01-15 07:32 PM",
    deliveryBoy,
    estimatedMinutes: 18,
    address: "Flat 4B, Sunshine Apartments, Koramangala, Bengaluru 560034",
  },
  {
    id: "ord002",
    dish: dishes[2],
    status: "delivered",
    orderedAt: "2024-01-14 09:10 AM",
    deliveryBoy,
    estimatedMinutes: 0,
    address: "Flat 4B, Sunshine Apartments, Koramangala, Bengaluru 560034",
  },
  {
    id: "ord003",
    dish: dishes[1],
    status: "delivered",
    orderedAt: "2024-01-13 01:45 PM",
    deliveryBoy,
    estimatedMinutes: 0,
    address: "Flat 4B, Sunshine Apartments, Koramangala, Bengaluru 560034",
  },
];

export const tasteOptions = [
  { id: "spicy", label: "🌶️ Spicy", desc: "I love it hot!" },
  { id: "mild", label: "😌 Mild", desc: "Gentle on the palate" },
  { id: "sweet", label: "🍬 Sweet", desc: "Give me desserts" },
  { id: "savory", label: "🧂 Savory", desc: "Rich & umami flavors" },
  { id: "tangy", label: "🍋 Tangy", desc: "Sour & refreshing" },
  { id: "all", label: "🍽️ All Types", desc: "I eat everything!" },
];
