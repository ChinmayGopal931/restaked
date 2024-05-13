import { ModeToggle } from "../mode-toggle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faXTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
export function Footer() {
  return (
    <div className={` pt-10 w-full flex-col`}>
      <div className="flex flex-col justify-center md:flex-row md:items-start pb-10">
        <div className="flex justify-center gap-12">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} size="lg" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faDiscord} size="lg" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ModeToggle />
          </a>
        </div>
      </div>
    </div>
  );
}
