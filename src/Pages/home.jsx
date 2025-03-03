import React from "react";
import greenLogo from "../assets/greenLogo.png";
import marketplace from "../assets/marketplace.png";
import analytics from "../assets/AnalyticsBanner.png";
import greenDiv from "../assets/greenDiv.png";
import videoDiv from "../assets/videoDiv.png";
import greenflower from "../assets/greenflower.png";
import audiomack from "../assets/audiomack.png";
import bandsintown from "../assets/bandsintown.png";
import books from "../assets/books.png";
import gift from "../assets/gift.png";
import cameo from "../assets/cameo.png";
import contact from "../assets/contact.png";
import bonfire from "../assets/bonfire.png";
import community from "../assets/community.png";
import clubhouse from "../assets/clubhouse.png";
import insta from "../assets/insta.png";
import blackLogo from "../assets/blackLogo.png";
import x from "../assets/x.png";
import youtube from "../assets/youtube.png";
import tiktok from "../assets/tiktok.png";
import "../styles/home.css";
import AppInfo from "../components/AppInfo";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/register");
  }

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="home-container">
      <div className="top-navbar">
        <div className="home-logo">
          <img src={greenLogo} alt="Logo" className="logo" />
          <h2 className="logo-title">
            SPARK<sup>TM</sup>
          </h2>
          <span>|</span>
          <img src={marketplace} alt="Marketplace" className="marketplace" />
        </div>
        <div className="home-signup-btn">
          <button className="signup-btn" onClick={() => handleSignup()}>Sign up free</button>
        </div>
      </div>
      <div className="home-hero-banner">
        <div className="hero-left">
          <h1 className="hero-title">
            The easiest place to update and share your Connection
          </h1>
          <h3 className="hero-subtitle">
            Help your followers discover everything you’re sharing all over the
            internet, in one simple place. They’ll thank you for it!
          </h3>
          <button className="signup-btn free-btn" onClick={() => handleSignup()}>Get your free Spark</button>
        </div>
        <div className="hero-right">
          <img
            src={analytics}
            alt="Analytics Banner"
            className="analytics-banner"
          />
        </div>
      </div>
      <div className="home-analyze-section">
        <div className="analyze-left">
          <img src={greenDiv} alt="Green Div" className="green-div" />
          <h3 className="analyze-image-caption">
            Sell products and collect payments. It’s monetization made simple.
          </h3>
        </div>
        <div className="analyze-right">
          <h2 className="analyze-title">
            Analyze your audience and keep your followers engaged
          </h2>
          <h4 className="analyze-subtitle">
            Track your engagement over time, monitor revenue and learn what’s
            converting your audience. Make informed updates on the fly to keep
            them coming back.
          </h4>
        </div>
      </div>
      <div className="home-share-section">
        <div className="share-left">
          <h2 className="share-title">
            Share limitless content in limitless ways
          </h2>
          <h4 className="share-subtitle">
            Connect your content in all its forms and help followers find more
            of what they’re looking for. Your TikToks, Tweets, YouTube videos,
            music, articles, recipes, podcasts and more… It all comes together
            in one powerful place
          </h4>
        </div>
        <div className="share-right">
          <img src={videoDiv} alt="Video Div" className="video-div" />
          <h3 className="video-image-caption">
            Share your content in limitless ways on your Spark
          </h3>
        </div>
      </div>
      <div className="home-customer-section">
        <div className="customer-left">
          <h1 className="customer-title">
            Here's what our{" "}
            <span className="customer-highlight">customer </span>
            has to says
          </h1>
          <button className="signup-btn customer-btn">
            Read customer stories
          </button>
        </div>
        <div className="customer-right">
          <img src={greenflower} alt="Green Flower" className="green-flower" />
          <h4 className="customer-image-caption">
            [short description goes in here] lorem ipsum is a placeholder text
            to demonstrate.
          </h4>
        </div>
      </div>
      <div className="home-testimonial-section">
        <div className="testimonial grey-color">
          <h2 className="testimonial-heading">Amazing tool! Saved me months</h2>
          <h4 className="testimonial-desc">
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure its 100% true and meaningful.
          </h4>
          <div className="testimonial-details">
            <div className="green-circle"></div>
            <div className="testimonial-info">
              <h4 className="testimonial-name">John Master</h4>
              <h4 className="testimonial-desg">Director, Spark.com</h4>
            </div>
          </div>
        </div>
        <div className="testimonial white-color">
          <h2 className="testimonial-heading">Amazing tool! Saved me months</h2>
          <h4 className="testimonial-desc">
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure its 100% true and meaningful.
          </h4>
          <div className="testimonial-details">
            <div className="green-circle"></div>
            <div className="testimonial-info">
              <h4 className="testimonial-name">John Master</h4>
              <h4 className="testimonial-desg">Director, Spark.com</h4>
            </div>
          </div>
        </div>
        <div className="testimonial white-color">
          <h2 className="testimonial-heading">Amazing tool! Saved me months</h2>
          <h4 className="testimonial-desc">
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure its 100% true and meaningful.
          </h4>
          <div className="testimonial-details">
            <div className="green-circle"></div>
            <div className="testimonial-info">
              <h4 className="testimonial-name">John Master</h4>
              <h4 className="testimonial-desg">Director, Spark.com</h4>
            </div>
          </div>
        </div>
        <div className="testimonial grey-color">
          <h2 className="testimonial-heading">Amazing tool! Saved me months</h2>
          <h4 className="testimonial-desc">
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure its 100% true and meaningful.
          </h4>
          <div className="testimonial-details">
            <div className="green-circle"></div>
            <div className="testimonial-info">
              <h4 className="testimonial-name">John Master</h4>
              <h4 className="testimonial-desg">Director, Spark.com</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="home-apps-section">
        <h1 className="app-heading">All Link Apps and Integrations</h1>
        <div className="app-info">
          <AppInfo
            imgSrc={audiomack}
            appName="Audiomack"
            appDetails="Add an Audiomack player to your Linktree"
          />
          <AppInfo
            imgSrc={bandsintown}
            appName="Bandsintown"
            appDetails="Drive ticket sales by listing your events"
          />
          <AppInfo
            imgSrc={bonfire}
            appName="Bonfire"
            appDetails="Display and sell your custom merch"
          />
          <AppInfo
            imgSrc={books}
            appName="Books"
            appDetails="Promote books on your Linktree"
          />
          <AppInfo
            imgSrc={gift}
            appName="Buy Me A Gift"
            appDetails="Let visitors support you with a small gift"
          />
          <AppInfo
            imgSrc={cameo}
            appName="Cameo"
            appDetails="Make impossible fan connections possible"
          />
          <AppInfo
            imgSrc={clubhouse}
            appName="Clubhouse"
            appDetails="Let your community in on the conversation"
          />
          <AppInfo
            imgSrc={community}
            appName="Community"
            appDetails="Build an SMS subscriber list"
          />
          <AppInfo
            imgSrc={contact}
            appName="Contact Details"
            appDetails="Easily share downloadable contact details"
          />
        </div>
      </div>
      <footer className="home-footer">
        <div className="footer-top">
          <div className="forward-btns">
            <button className="login-btn"  onClick={() => handleLogin()}>Log in</button>
            <button className="signup-btn footer-signup-btn"  onClick={() => handleSignup()}>Sign up free</button>
          </div>
          <div className="footer-menu">
            <nav>
              <li>About Spark</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Social Good</li>
              <li>Contact</li>
              <li>Careers</li>
              <li>Getting Started</li>
              <li>Features and How-Tos</li>
              <li>FAQs</li>
              <li>Report a violation</li>
              <li>Terms and conditions</li>
              <li>Privacy Policy</li>
              <li>Cookie Notice</li>
              <li>Trust Center</li>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-ackn">
            We acknowledge the Traditional Custodians of the land on which our
            office stands, The Wurundjeri people of the Kulin Nation, and pay
            our respects to Elders past, present and emerging.
          </p>
          <div className="social-media-icons">
            <img src={x} alt="X" className="x-icon" />
            <img src={insta} alt="Insta" className="insta-icon" />
            <img src={youtube} alt="Youtube" className="youtube-icon" />
            <img src={tiktok} alt="Tiktok" className="tiktok-icon" />
            <img src={blackLogo} alt="Black Logo" className="black-logo-icon" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
