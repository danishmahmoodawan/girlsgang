
import { useState, useEffect } from 'react';
import '../index.css';

const ZERO_ADDRESS = "0x094a44a140ef59b8ebf9e7fa92234649dc44cd2f";
// const ZERO_ADDRESS = "0xfA93a74be60487D81272F370845d5D35F1DC4562";
function Home() {
  return (
   <> 
    <section class="main_section ">
		<div class="container-fluid set_pading">
			<div class="row">
				<div class="col-12 col-md-4 col_vertical">
					 <h2 class="head_main">“ SOME QUOTE CAN BE PLACED HERE AS A HEADING” <p class="font_bg back_bg"> . SOME GIRL</p></h2>
				
				</div>
				<div class="col-12 col-md-6 background_col"> 
					<div class="row set_row"><div class="col-12"><img class="imge_set" src="assets/images/logo.png" alt="girls_gangs"/> </div> </div>
					<div class="row set_row  text-center"><div class="col-12"> <a href="#"><img src="assets/images/icon/ICON_INSTA.svg" alt="insta_icon"/></a>
						<a href="#"><img src="assets/images/icon/ICON_MEDIUM.svg" alt="medium_icon"/></a>
						<a href="#"><img src="assets/images/icon/ICON_OS.svg" alt="_icon"></a>
						<a href="#"><img src="assets/images/icon/ICON_TWITTER.svg" alt="twitter_icon"></a>
						<a href="#"><img src="assets/images/icon/ICON_DISCORD.svg" alt="discord_icon"></a>
					</div> </div>
					<div class="row set_row  text-center"><div class="col-12"><img class="girls_icon imge_set" src="assets/images/Group_2.svg" alt="girls_gangs"> </div> </div>
					<div class="row set_row  text-center"><div class="col-12"><h5 class="d-inline head_main">1369</h5><h5 class="d-inline head_main col_bg_f">/2500</h5> </div> </div>
					<div class="row set_row  text-center"><div class="col-12">	
						<button type="button" class="btn btn_font btn_bg mb-2 d-block">20</button>
						<button type="button" class="btn btn_font btn_bg2 mb-2 d-block">MINT</button>
					</div> </div>
					<div class="row set_row  text-center"><div class="col-12"><h5 class="d-inline head_text col_bg_f">2500 NFTs of diverse and powerful Girls
							Not affiliated with either project we are derived from</h5> </div> </div>
				
                    
			    </div>
			<div class="col-12 col-md-2">  </div>
			</div>
		</div>
		
	</section>
   </>
  );
}

export default Home;