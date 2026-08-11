// lib/radio.ts
export type Track = {
  title: string;
  artist: string;
  duration: number;
  src: string;
  cover: string;
};

export const playlist: Track[] = [
  {
    title: "Mayabini",
    artist: "Zubeen Garg & Jonki",
    duration: 319,
    src: "/audio/Track1.mp3",
    cover: "/covers/track1.jpg",
  },
  {
    title: "Roi Roi Binale",
    artist: "Zubeen Garg ft. Gioconda Vessichelli",
    duration: 363,
    src: "/audio/Track2.mp3",
    cover: "/covers/track2.jpg",
  },
  {
    title: "Agoli Bahore",
    artist: "Zubeen Garg",
    duration: 293,
    src: "/audio/Track3.mp3",
    cover: "/covers/track3.jpg",
  },
  {
    title: "Dhiniki Dhin Dau",
    artist: "Zubeen Garg",
    duration: 290,
    src: "/audio/Track4.mp3",
    cover: "/covers/track4.jpg",
  },
  {
    title: "I Love You",
    artist: "Zubeen Garg",
    duration: 254,
    src: "/audio/Track5.mp3",
    cover: "/covers/track5.jpg",
  },
  {
    title: "Tumi Suwa Jetia",
    artist: "Zubeen Garg",
    duration: 377,
    src: "/audio/Track6.mp3",
    cover: "/covers/track6.jpg",
  },
  {
    title: "Meghor Jolonga",
    artist: "Pompi Gogoi",
    duration: 201,
    src: "/audio/Track7.mp3",
    cover: "/covers/track7.jpg",
  },
  {
    title: "Pogola Pogola",
    artist: "Zubeen Garg",
    duration: 278,
    src: "/audio/Track8.mp3",
    cover: "/covers/track8.jpg",
  },
  {
    title: "Anamika",
    artist: "Zubeen Garg, Shatabdi Borah, Babu Boruah",
    duration: 343,
    src: "/audio/Track9.mp3",
    cover: "/covers/track9.jpg",
  },
  {
    title: "Dihingor Pani",
    artist: "Zubeen Garg, Sushmita Boruah",
    duration: 287,
    src: "/audio/Track10.mp3",
    cover: "/covers/track10.jpg",
  },
  {
    title: "Anuradha",
    artist: "Zubeen Garg",
    duration: 246,
    src: "/audio/Track11.mp3",
    cover: "/covers/track11.jpg",
  },
  {
    title: "Bhobai Nasilu",
    artist: "Zubeen Garg, Deeplina Deka",
    duration: 235,
    src: "/audio/Track12.mp3",
    cover: "/covers/track12.jpg",
  },
  {
    title: "Ejak Borokhune",
    artist: "Zubeen Garg",
    duration: 332,
    src: "/audio/Track13.mp3",
    cover: "/covers/track13.jpg",
  },
  {
    title: "Luitor Bukute",
    artist: "Zubeen Garg",
    duration: 312,
    src: "/audio/Track14.mp3",
    cover: "/covers/track14.jpg",
  },
  {
    title: "Mur Mon",
    artist: "Zubeen Garg",
    duration: 192,
    src: "/audio/Track15.mp3",
    cover: "/covers/track15.jpg",
  },
  {
    title: "Bagorumba",
    artist: "Zubeen Garg, Zublee Baruah",
    duration: 255,
    src: "/audio/Track16.mp3",
    cover: "/covers/track16.jpg",
  },
  {
    title: "Sesa Pori",
    artist: "Babu",
    duration: 385,
    src: "/audio/Track17.mp3",
    cover: "/covers/track17.jpg",
  },
  {
    title: "Bohona",
    artist: "Abhi Saikia, Pinky Medhi, Somiran Malay",
    duration: 305,
    src: "/audio/Track18.mp3",
    cover: "/covers/track18.jpg",
  },
  // ...your other tracks
];

const totalDuration = playlist.reduce((sum, t) => sum + t.duration, 0);
const STATION_EPOCH = new Date("2026-01-01T00:00:00Z").getTime();

export function getNowPlaying(now: number = Date.now()) {
  const elapsed = ((now - STATION_EPOCH) / 1000) % totalDuration;
  let acc = 0;

  for (let i = 0; i < playlist.length; i++) {
    const track = playlist[i];
    if (elapsed < acc + track.duration) {
      const next = playlist[(i + 1) % playlist.length];
      return {
        track,
        offset: elapsed - acc,
        next,
      };
    }
    acc += track.duration;
  }

  return { track: playlist[0], offset: 0, next: playlist[1] ?? playlist[0] };
}