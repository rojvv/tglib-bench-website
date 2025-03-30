export interface Library {
  slug: string;
  name: string;
  link: string;
}

export const libraries: Library[] = [
  {
    slug: "00_mtkruto",
    name: "MTKruto",
    link: "https://github.com/MTKruto/MTKruto",
  },
  {
    slug: "01_fasttelethon",
    name: "FastTelethon",
    link: "https://gist.github.com/painor/7e74de80ae0c819d3e9abcf9989a8dd6",
  },
  {
    slug: "02_mtcute",
    name: "mtcute",
    link: "https://github.com/mtcute/mtcute",
  },
  {
    slug: "03_telethon",
    name: "Telethon",
    link: "https://github.com/LonamiWebs/telethon",
  },
  {
    slug: "04_tdlib",
    name: "TDLib",
    link: "https://github.com/tdlib/td",
  },
  {
    slug: "05_wtelegramclient",
    name: "WTelegramClient",
    link: "https://github.com/wiz0u/WTelegramClient",
  },
];
