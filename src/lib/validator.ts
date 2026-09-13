import { z } from "zod";
import {
  APPOINTMENT_SERVICES,
  BODY_TYPES,
  FUELS,
  OCCASION_CONDITIONS,
  OCCASION_STATUSES,
  SERVICE_TIMESLOTS,
  TRANSMISSIONS,
} from "@/lib/site";

export const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(8).max(128),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(5000),
});

export const occasionInputSchema = z.object({
  brand: z.string().trim().min(1).max(80),
  model: z.string().trim().min(1).max(80),
  variant: z.string().trim().max(80).optional().default(""),
  bodyType: z.enum(BODY_TYPES),
  title: z.string().trim().min(1).max(120),
  year: z.coerce.number().int().min(1900).max(2100),
  mileageKm: z.coerce.number().int().min(0).max(5_000_000),
  fuel: z.enum(FUELS),
  transmission: z.enum(TRANSMISSIONS),
  powerKw: z.coerce.number().int().min(0).max(2000).optional().default(0),
  doors: z.coerce.number().int().min(2).max(7).optional().default(5),
  color: z.string().trim().max(60).optional().default(""),
  price: z.coerce.number().min(0).max(10_000_000),
  monthlyFrom: z.coerce.number().min(0).max(1_000_000).optional().default(0),
  description: z.string().trim().min(10).max(10_000),
  features: z.array(z.string().trim().min(1).max(120)).max(30),
  featured: z.union([z.boolean(), z.literal("on"), z.literal("true"), z.literal("false")]).transform((v) => v === true || v === "on" || v === "true"),
  status: z.enum(OCCASION_STATUSES),
  images: z.array(z.string().trim().min(1).max(200)).max(10),
});

export const actieInputSchema = z.object({
  title: z.string().trim().min(3).max(120),
  badge: z.string().trim().max(40).optional().default(""),
  summary: z.string().trim().min(10).max(300),
  body: z.string().trim().min(20).max(10_000),
  image: z.string().trim().max(200).optional().default(""),
  featured: z.union([z.boolean(), z.literal("on"), z.literal("true"), z.literal("false")]).transform((v) => v === true || v === "on" || v === "true"),
  status: z.enum(["Draft", "Published"]),
  startsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal("")).optional(),
});

export const afspraakSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(30),
  service: z.enum(APPOINTMENT_SERVICES),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.enum(SERVICE_TIMESLOTS),
  notes: z.string().trim().max(2000).optional().default(""),
});

export const taxatieSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(30),
  brand: z.string().trim().min(1).max(80),
  model: z.string().trim().min(1).max(80),
  year: z.coerce.number().int().min(1900).max(2100),
  mileageKm: z.coerce.number().int().min(0).max(5_000_000),
  fuel: z.enum(FUELS),
  condition: z.enum(OCCASION_CONDITIONS),
  notes: z.string().trim().max(2000).optional().default(""),
});

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;