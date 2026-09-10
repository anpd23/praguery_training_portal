import type { MenuItem } from "@/types/academy";

export const allergyNotice =
  "Please be advised that food prepared here may contain and have cross contamination of: milk, eggs, wheat, peanuts, tree nuts. Please inform our crafter of any allergies.";

export const menuItems: MenuItem[] = [
  {
    id: "cone-salted-caramel-pecan",
    number: 1,
    name: "Salted Caramel Pecan",
    category: "cone",
    isPremium: true,
    description: "Vanilla soft serve in a freshly baked cinnamon cone. Salted caramel and candied pecans made in house.",
    allergens: ["milk", "wheat", "tree nuts"],
    staffPriceLabel: "Till: see current board",
  },
  {
    id: "cone-strawberry-cheesecake",
    number: 2,
    name: "Strawberry Cheesecake",
    category: "cone",
    isPremium: true,
    description: "Strawberry coulis, cheesecake, graham crackers — house-made sauce, never “just topping.”",
    photo: "/brand/sauce-pour.jpg",
    allergens: ["milk", "wheat"],
  },
  {
    id: "cone-pistachio",
    number: 3,
    name: "Pistachio",
    category: "cone",
    isPremium: true,
    description: "House-made pistachio sauce and pistachios over vanilla soft serve.",
    photo: "/brand/cone-pistachio.jpg",
    allergens: ["milk", "wheat", "tree nuts"],
  },
  {
    id: "cone-chocolate-brownie",
    number: 4,
    name: "Chocolate Brownie",
    category: "cone",
    isPremium: true,
    description: "Nutella, chocolate sauce, and brownies on vanilla soft serve in a cinnamon cone.",
    photo: "/brand/cone-chocolate-brownie.jpg",
    allergens: ["milk", "wheat", "tree nuts"],
  },
  {
    id: "cone-mango-tango",
    number: 5,
    name: "Mango Tango",
    category: "cone",
    isPremium: false,
    description: "Mango coulis, toasted coconut, dried mango.",
    allergens: ["milk", "wheat"],
  },
  {
    id: "cone-lemon-crumble",
    number: 6,
    name: "Lemon Crumble",
    category: "cone",
    isPremium: false,
    description: "Lemon sauce and graham crackers.",
    allergens: ["milk", "wheat"],
  },
  {
    id: "cup-soft-serve",
    number: 8,
    name: "Cup instead — no cone",
    category: "cup",
    isPremium: false,
    description: "Vanilla soft serve in a cup when a guest skips the chimney cone. Small or large, regular or with extra.",
    allergens: ["milk"],
  },
  {
    id: "drink-lemonade",
    name: "Real fruit lemonade",
    category: "drink",
    isPremium: false,
    description: "Lemon. Freshly squeezed, always. Taste good — that’s the standard on the board.",
    allergens: [],
  },
  {
    id: "drink-affogato",
    name: "Affogato",
    category: "drink",
    isPremium: false,
    description: "Vanilla soft serve with a double shot of hot espresso. Creamy soft serve and espresso.",
    allergens: ["milk"],
  },
  {
    id: "drink-espresso",
    name: "The Classic Italian Espresso Blend",
    category: "drink",
    isPremium: false,
    description: "Double espresso, cappuccino, Americano, latte, Praguery Latte (vanilla, whipped cream).",
    allergens: ["milk"],
  },
  {
    id: "takehome-cinnamon",
    number: 9,
    name: "Take-home cinnamon cone",
    category: "take_home",
    isPremium: false,
    description: "Freshly baked cinnamon cone, no ice cream included. Offer Nutella or lemon curd spread.",
    allergens: ["wheat"],
  },
  {
    id: "takehome-coconut",
    number: 10,
    name: "Take-home coconut cone",
    category: "take_home",
    isPremium: false,
    description: "Coconut-coated chimney cone to go. No ice cream included.",
    allergens: ["wheat", "tree nuts"],
  },
  {
    id: "takehome-box",
    number: 11,
    name: "Cone box",
    category: "take_home",
    isPremium: false,
    description: "Two cones with whipped cream and a house-made dip. Ice cream can be added.",
    allergens: ["milk", "wheat"],
  },
];

export const dips = [
  { id: "dip-mango", name: "Mango", color: "#E8A317" },
  { id: "dip-caramel", name: "Salted caramel", color: "#C47A3A" },
  { id: "dip-strawberry", name: "Strawberry", color: "#C23B4A" },
  { id: "dip-lemon", name: "Lemon", color: "#E3C44A" },
  { id: "dip-chocolate", name: "Chocolate", color: "#4A2C1A" },
];

export const addOns = ["Oatmilk", "Whipped cream", "Syrups", "Extra espresso shot"];

export const cones = menuItems.filter((item) => item.category === "cone");
export const drinks = menuItems.filter((item) => item.category === "drink");
export const takeHome = menuItems.filter((item) => item.category === "take_home");
