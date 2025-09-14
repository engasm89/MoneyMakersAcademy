import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Please enter a valid email address");

export const phoneSchema = z.string().min(10, "Phone number must be at least 10 digits");

export const nameSchema = z.string().min(2, "Name must be at least 2 characters");

export const messageSchema = z.string().min(10, "Message must be at least 10 characters");

// Contact form validation
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  message: messageSchema,
  preferredContact: z.string().optional(),
  urgency: z.string().optional(),
});

// EA request form validation
export const eaRequestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  strategy: z.string().min(20, "Please describe your strategy in detail"),
  timeframe: z.string().min(1, "Please select a timeframe"),
  riskLevel: z.string().min(1, "Please select a risk level"),
  budget: z.string().min(1, "Please select a budget range"),
  experience: z.string().min(1, "Please select your experience level"),
  additionalRequirements: z.string().optional(),
});

// Managed account application validation
export const managedAccountSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  investmentAmount: z.string().min(1, "Please select an investment amount"),
  riskTolerance: z.string().min(1, "Please select your risk tolerance"),
  tradingExperience: z.string().min(1, "Please select your trading experience"),
  investmentGoals: z.string().min(10, "Please describe your investment goals"),
  timeHorizon: z.string().min(1, "Please select your time horizon"),
  additionalInfo: z.string().optional(),
});

// Newsletter signup validation
export const newsletterSchema = z.object({
  email: emailSchema,
  interests: z.array(z.string()).optional(),
});

// Course enrollment validation
export const courseEnrollmentSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  courseId: z.string().min(1, "Please select a course"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

// User profile validation
export const userProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  country: z.string().min(1, "Please select your country"),
  timezone: z.string().min(1, "Please select your timezone"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

// Password validation
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// Login form validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Registration form validation
export const registerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Utility functions
export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error instanceof z.ZodError ? error.errors[0].message : "Invalid email" };
  }
};

export const validatePhone = (phone: string) => {
  try {
    phoneSchema.parse(phone);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error instanceof z.ZodError ? error.errors[0].message : "Invalid phone number" };
  }
};

export const validatePassword = (password: string) => {
  try {
    passwordSchema.parse(password);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error instanceof z.ZodError ? error.errors[0].message : "Invalid password" };
  }
};

// Form field validation helpers
export const getFieldError = (errors: any, fieldName: string) => {
  return errors[fieldName]?.message || null;
};

export const isFieldValid = (errors: any, fieldName: string) => {
  return !errors[fieldName];
};

export const hasFormErrors = (errors: any) => {
  return Object.keys(errors).length > 0;
};
