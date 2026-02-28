export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  prepTime: string;
  popular?: boolean;
}

export const categories = [
  { id: "all", label: "All", emoji: "🍽️" },
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "sushi", label: "Sushi", emoji: "🍣" },
  { id: "tacos", label: "Tacos", emoji: "🌮" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Smash Burger Deluxe",
    description: "Double smashed patties, aged cheddar, caramelized onions, secret sauce on brioche bun",
    price: 16.99,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    rating: 4.9,
    prepTime: "15 min",
    popular: true,
  },
  {
    id: "2",
    name: "Margherita Napoletana",
    description: "San Marzano tomatoes, fresh mozzarella di bufala, basil, extra virgin olive oil",
    price: 18.50,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
    rating: 4.8,
    prepTime: "20 min",
    popular: true,
  },
  {
    id: "3",
    name: "Dragon Roll",
    description: "Shrimp tempura, avocado, cucumber topped with thinly sliced avocado and tobiko",
    price: 22.00,
    category: "sushi",
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80",
    rating: 4.7,
    prepTime: "18 min",
  },
  {
    id: "4",
    name: "Al Pastor Tacos",
    description: "Marinated pork shoulder, pineapple, onion, cilantro on warm corn tortillas",
    price: 14.99,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
    rating: 4.6,
    prepTime: "12 min",
    popular: true,
  },
  {
    id: "5",
    name: "Truffle Carbonara",
    description: "Fresh tagliatelle, guanciale, pecorino romano, egg yolk, black truffle shavings",
    price: 24.00,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80",
    rating: 4.9,
    prepTime: "22 min",
  },
  {
    id: "6",
    name: "Lava Chocolate Cake",
    description: "Warm dark chocolate fondant, vanilla bean ice cream, raspberry coulis",
    price: 11.50,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80",
    rating: 4.8,
    prepTime: "10 min",
  },
  {
    id: "7",
    name: "Truffle Mushroom Burger",
    description: "Wagyu beef patty, sautéed wild mushrooms, truffle aioli, arugula, gruyère",
    price: 21.99,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80",
    rating: 4.7,
    prepTime: "17 min",
  },
  {
    id: "8",
    name: "Spicy Tuna Roll",
    description: "Fresh tuna, cucumber, spicy mayo, sriracha, sesame seeds, scallions",
    price: 18.50,
    category: "sushi",
    image: "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&q=80",
    rating: 4.6,
    prepTime: "15 min",
  },
  {
    id: "9",
    name: "BBQ Chicken Pizza",
    description: "Smoky BBQ sauce, grilled chicken, red onion, jalapeños, cilantro, mozzarella",
    price: 20.00,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    rating: 4.5,
    prepTime: "25 min",
  },
  {
    id: "10",
    name: "Tiramisu Classico",
    description: "Espresso-soaked ladyfingers, mascarpone cream, cocoa dusting, rum",
    price: 10.00,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    rating: 4.9,
    prepTime: "5 min",
  },
  {
    id: "11",
    name: "Shrimp Fajita Tacos",
    description: "Grilled tiger shrimp, charred peppers, guacamole, pico de gallo, chipotle cream",
    price: 16.50,
    category: "tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80",
    rating: 4.7,
    prepTime: "14 min",
  },
  {
    id: "12",
    name: "Cacio e Pepe",
    description: "Spaghetti, aged pecorino, toasted black pepper, extra virgin olive oil",
    price: 19.50,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80",
    rating: 4.8,
    prepTime: "18 min",
  },
];
