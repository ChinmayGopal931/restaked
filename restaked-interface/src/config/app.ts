interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  author: {
    name: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "",
  github: {
    title: "restaked",
    url: "https://github.com/",
  },
  author: {
    name: "restaked",
    url: "https://github.com/",
  },
};
