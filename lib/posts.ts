export type PostType = "logro" | "actividad" | "anuncio";

export interface FeedPost {
  id: string;
  type: PostType;
  authorName: string;
  authorInitial: string;
  time: string;
  audience: string;
  body: string;
  hasPhoto: boolean;
  photoLabel?: string;
  reactions: number;
  comments: number;
}

export const TAG_STYLES: Record<PostType, { bg: string; color: string }> = {
  logro: { bg: "#CFEBD8", color: "#3E9B6C" },
  actividad: { bg: "#C7E7F1", color: "#2E89A6" },
  anuncio: { bg: "#CCD8F4", color: "#4E72C8" },
};

export const posts: FeedPost[] = [
  {
    id: "logro-mateo-orinal",
    type: "logro",
    authorName: "Mateo",
    authorInitial: "M",
    time: "14:20",
    audience: "familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    hasPhoto: false,
    reactions: 3,
    comments: 1,
  },
  {
    id: "actividad-temperas",
    type: "actividad",
    authorName: "Mateo",
    authorInitial: "M",
    time: "09:40",
    audience: "familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    hasPhoto: true,
    photoLabel: "Foto · pintando con témperas",
    reactions: 5,
    comments: 2,
  },
  {
    id: "anuncio-parque",
    type: "anuncio",
    authorName: "Anuncio general",
    authorInitial: "",
    time: "07:50",
    audience: "toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    hasPhoto: false,
    reactions: 8,
    comments: 0,
  },
];
