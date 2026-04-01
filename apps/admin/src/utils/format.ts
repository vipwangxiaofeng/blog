import dayjs from "dayjs";

// Date formatting
export function formatDate(date: string | Date, format = "YYYY-MM-DD"): string {
  return dayjs(date).format(format);
}

export function formatDateTime(
  date: string | Date,
  format = "YYYY-MM-DD HH:mm:ss",
): string {
  return dayjs(date).format(format);
}

export function formatRelativeTime(date: string | Date): string {
  const now = dayjs();
  const target = dayjs(date);
  const diffSeconds = now.diff(target, "second");
  const diffMinutes = now.diff(target, "minute");
  const diffHours = now.diff(target, "hour");
  const diffDays = now.diff(target, "day");

  if (diffSeconds < 60) return "刚刚";
  if (diffMinutes < 60) return `${diffMinutes} 分钟前`;
  if (diffHours < 24) return `${diffHours} 小时前`;
  if (diffDays < 30) return `${diffDays} 天前`;
  return target.format("YYYY-MM-DD");
}

// Number formatting
export function formatNumber(num: number): string {
  return num.toLocaleString("zh-CN");
}

export function formatCurrency(num: number, currency = "CNY"): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
  }).format(num);
}

export function formatPercent(num: number, decimals = 1): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

// File size formatting
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// String formatting
export function truncate(str: string, length: number, suffix = "..."): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Phone number masking
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 11) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

// Email masking
export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  const maskedName = name.length > 2 ? name[0] + "***" + name.slice(-1) : "***";
  return `${maskedName}@${domain}`;
}
