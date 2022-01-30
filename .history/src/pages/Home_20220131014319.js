
import { useState, useEffect } from 'react';
// import '../index.css';

function Home() {
  return (
   <> 
    <section className="main_section ">
  <div className="container-fluid set_pading">
    <div className="row">
      <div className="col-12 col-md-5 col_vertical">
        <h2 className="head_main mob_pa">
          “ SOME QUOTE CAN <br /> BE PLACED HERE AS <br /> A HEADING”{" "}
          <p className="font_bg back_bg"> . SOME GIRL</p>
        </h2>
      </div>
      <div className="col-12 col-md-6 background_col">
        <div className="row set_row text-center">
          <div className="col-12">
            <img
              className="imge_set"
              src="assets/images/logo.png"
              alt="girls_gangs"
            />{" "}
          </div>{" "}
        </div>
        <div className="row set_row  text-center">
          <div className="col-12">
            {" "}
            <a href="#">
              <img src="assets/images/icon/ICON_INSTA.svg" alt="insta_icon" />
            </a>
            <a href="#">
              <img src="assets/images/icon/ICON_MEDIUM.svg" alt="medium_icon" />
            </a>
            <a href="#">
              <img src="assets/images/icon/ICON_OS.svg" alt="_icon" />
            </a>
            <a href="#">
              <img
                src="assets/images/icon/ICON_TWITTER.svg"
                alt="twitter_icon"
              />
            </a>
            <a href="#">
              <img
                src="assets/images/icon/ICON_DISCORD.svg"
                alt="discord_icon"
              />
            </a>
          </div>{" "}
        </div>
        <div className="row set_row  text-center">
          <div className="col-12">
            <img
              className="girls_icon imge_set"
              src="assets/images/Group_2.svg"
              alt="girls_gangs"
            />{" "}
          </div>{" "}
        </div>
        <div className="row set_row  text-center">
          <div className="col-12">
            <h5 className="d-inline head_main">1369</h5>
            <h5 className="d-inline head_main col_bg_f">/2500</h5>{" "}
          </div>{" "}
        </div>
        <div className="row set_row  text-center">
          <div className="col-12">
            <button type="button" className="btn btn_font btn_bg mb-2 d-block">
              20
            </button>
            <button type="button" className="btn btn_font btn_bg2 mb-2 d-block">
              MINT
            </button>
          </div>{" "}
        </div>
        <div className="row set_row  text-center">
          <div className="col-12">
            <h5 className="d-inline head_text col_bg_f">
              2500 NFTs of diverse and powerful Girls Not affiliated with either
              project we are derived from
            </h5>{" "}
          </div>{" "}
        </div>
      </div>
      <div className="col-12 col-md-1"> </div>
    </div>
  </div>
</section>;

   </>
  );
}

export default Home;