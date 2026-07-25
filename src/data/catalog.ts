import cruz from "@/assets/project-cruz.jpg";
import casita from "@/assets/casita-nazaret.png.asset.json";
import banco from "@/assets/project-banco.jpg";
import cajon from "@/assets/project-cajon.jpg";

export interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  dificultad: 1 | 2 | 3 | 4 | 5;
  tiempo: string;
  aprendizajes: string[];
}

export const catalogo: Proyecto[] = [
  {
    id: "cruz",
    titulo: "Cruz",
    descripcion:
      "La primera obra. Dos maderas que se encuentran para recordarnos que las cosas más simples suelen ser las que más nos enseñan. Cortar, lijar y unir con paciencia.",
    imagen: cruz,
    dificultad: 1,
    tiempo: "20 minutos",
    aprendizajes: ["Medir", "Lijar", "Ensamblar", "Precisión"],
  },
  {
    id: "casita",
    titulo: "Casita",
    descripcion:
      "Un pequeño refugio hecho a mano. Aquí la madera aprende a levantar paredes, a sostener un techo, a proteger. Un proyecto que enseña a pensar antes de cortar.",
    imagen: casita,
    dificultad: 3,
    tiempo: "2 horas",
    aprendizajes: ["Planificar", "Cortar en ángulo", "Ensamblado limpio", "Acabados"],
  },
  {
    id: "banco",
    titulo: "Banco",
    descripcion:
      "Un banco es una invitación a sentarse, a mirar, a descansar. Construir uno es aprender que la madera puede sostenernos si la trabajamos con calma y respeto.",
    imagen: banco,
    dificultad: 2,
    tiempo: "1 hora",
    aprendizajes: ["Estructura", "Nivelar", "Uniones firmes", "Paciencia"],
  },
  {
    id: "cajon",
    titulo: "Cajón",
    descripcion:
      "Guardar es también un arte. Este cajón enseña que cada tabla tiene su lugar exacto y que un objeto útil puede ser, además, hermoso.",
    imagen: cajon,
    dificultad: 2,
    tiempo: "1 hora 30 minutos",
    aprendizajes: ["Escuadra", "Ensamble a caja", "Lijado fino", "Detalle"],
  },
];
