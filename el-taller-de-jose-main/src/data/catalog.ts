import cruz from "@/assets/project-cruz.jpg";
import casita from "@/assets/casita-nazaret-ambientada.jpg.asset.json";
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
      "Dos simples maderas que se encuentran para dar vida al símbolo más grande de amor y esperanza. A lo largo de la historia, la cruz ha recordado que incluso del sacrificio puede brotar la vida. Que esta creación, hecha con tus propias manos, sea también un recordatorio de la fe que sostiene, acompaña y guía cada camino.",
    imagen: cruz,
    dificultad: 1,
    tiempo: "20 minutos",
    aprendizajes: ["Medir", "Lijar", "Ensamblar", "Precisión"],
  },
  {
    id: "casita",
    titulo: "Casita de Nazaret",
    descripcion:
      "En una casa sencilla de Nazaret crecieron Jesús, María y José. Entre paredes humildes se aprendió el valor del trabajo, el amor compartido y la presencia de Dios en la vida cotidiana. Esta pequeña casita nos recuerda que un hogar no se mide por su tamaño, sino por el amor que habita en él.",
    imagen: casita.url,
    dificultad: 3,
    tiempo: "2 horas",
    aprendizajes: ["Planificar", "Cortar en ángulo", "Ensamblado limpio", "Acabados"],
  },
  {
    id: "banco",
    titulo: "Banco",
    descripcion:
      "Un banco es mucho más que un lugar para sentarse. Es el espacio donde nacen las conversaciones, donde se comparten silencios y donde el descanso encuentra su lugar. Que esta sencilla creación nos recuerde que siempre vale la pena hacer una pausa para encontrarnos con los demás y con Dios.",
    imagen: banco,
    dificultad: 2,
    tiempo: "1 hora",
    aprendizajes: ["Estructura", "Nivelar", "Uniones firmes", "Paciencia"],
  },
  {
    id: "cajon",
    titulo: "Cajón Multiuso",
    descripcion:
      "Un pequeño cajón de madera pensado para llevar con vos aquello que más valorás. Una invitación a tener siempre cerca eso que da sentido a nuestro camino y nos recuerda lo verdaderamente importante.",
    imagen: cajon,
    dificultad: 2,
    tiempo: "1 hora 30 minutos",
    aprendizajes: ["Escuadra", "Ensamble a caja", "Lijado fino", "Detalle"],
  },
];
