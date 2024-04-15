export default function Footer(){
  return (
    <footer className="footer-container text-center p-3">
        <span>© {new Date().getFullYear()} Tyrconnell LLC. All rights reserved.</span>
        <div className="footer-links">
          <a href="https://restaked-app.gitbook.io/restaked.app-api-documentation/terms-of-service">Terms of Service</a>
        </div>
    </footer>
  );
};
