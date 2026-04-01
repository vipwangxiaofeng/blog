import { z } from "zod";

// Email validation
export const emailSchema = z.string().email("请输入有效的邮箱地址");

// Phone validation (Chinese phone number)
export const phoneSchema = z
  .string()
  .regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码");

// Password validation
export const passwordSchema = z
  .string()
  .min(6, "密码至少6个字符")
  .max(20, "密码最多20个字符");

// Username validation
export const usernameSchema = z
  .string()
  .min(2, "用户名至少2个字符")
  .max(20, "用户名最多20个字符")
  .regex(/^[a-zA-Z0-9_]+$/, "用户名只能包含字母、数字和下划线");

// URL validation
export const urlSchema = z.string().url("请输入有效的URL");

// Required string
export const requiredString = (fieldName: string) =>
  z.string().min(1, `${fieldName}不能为空`);

// Login form schema
export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  remember: z.boolean().optional(),
});

// User form schema
export const userFormSchema = z.object({
  username: usernameSchema,
  nickname: requiredString("昵称"),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  password: passwordSchema.optional().or(z.literal("")),
  roleIds: z.array(z.number()).min(1, "请至少选择一个角色"),
  status: z.enum(["active", "inactive"]),
});

// Role form schema
export const roleFormSchema = z.object({
  name: requiredString("角色名称"),
  code: z
    .string()
    .min(2, "角色编码至少2个字符")
    .max(20, "角色编码最多20个字符")
    .regex(/^[a-zA-Z_]+$/, "角色编码只能包含字母和下划线"),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "请至少选择一个权限"),
  status: z.enum(["active", "inactive"]),
});

// Menu form schema
export const menuFormSchema = z.object({
  parentId: z.number().nullable(),
  name: requiredString("菜单名称"),
  path: requiredString("路由路径"),
  component: z.string().optional(),
  redirect: z.string().optional(),
  icon: z.string().optional(),
  title: requiredString("菜单标题"),
  sort: z.number().min(0, "排序不能小于0"),
  hidden: z.boolean(),
  keepAlive: z.boolean(),
});

// Change password schema
export const changePasswordSchema = z
  .object({
    oldPassword: requiredString("旧密码"),
    newPassword: passwordSchema,
    confirmPassword: requiredString("确认密码"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

// Validation helper
export function validateField(schema: z.ZodSchema, value: any): string | null {
  const result = schema.safeParse(value);
  if (!result.success) {
    return result.error.errors[0]?.message || "验证失败";
  }
  return null;
}
