
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../PZero.json';
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import '../index.css';
import { merkleData } from '../merkle_data';
const nl = require("../merkle_data");

const ZERO_ADDRESS = "0x094a44a140ef59b8ebf9e7fa92234649dc44cd2f";
// const ZERO_ADDRESS = "0xfA93a74be60487D81272F370845d5D35F1DC4562";
function Home() {
    const [error, setError] = useState('');
  const [supply, setSupply] = useState({})
  const [mintNumber, setMintNumber] = useState(1)
  const [root, setRoot] = useState()
    const salestate = 0;
    
  const [claimingNft, setClaimingNft] = useState(false);
    const [feedback, setFeedback] = useState(``);
    const { ethereum } = window;
    const metamaskIsInstalled = (ethereum && ethereum.isMetaMask);


    useEffect(() => {
      fetchData();
      if (metamaskIsInstalled){
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
            
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
        }
      
  }, [])
  async function fetchData() {
    if(typeof window.ethereum !== 'undefined' && window.ethereum !== "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ZERO_ADDRESS, abi.abi, provider);
      try {
        const totalSupply = await contract.totalSupply();
        const object = {"totalSupply": String(totalSupply), "percent" : String(String((totalSupply / 5555 * 100)).slice(0, 3)) + '%'}
        setSupply(object);
      }
      catch(err) {
        setError(err.message);
      }
    }
  }
  async function decreaseMintNumber() {
    if (mintNumber > 1)
        setMintNumber(mintNumber -1);
  };
  async function increaseMintNumber() {
    if (mintNumber < 20)
        setMintNumber(mintNumber + 1);
    };
    
    
  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
        const contract = new ethers.Contract(ZERO_ADDRESS, abi.abi, signer);
        // console.log("contract",contract)

        let total_price = String("0.04" * mintNumber)
        // setClaimingNft(true);
        
        try {
            let accounts = window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            // console.log(1)

            const networkId = await ethereum.request({
                method: "net_version",
            });

            if (1 == parseInt(networkId) && metamaskIsInstalled === true){
            
            

                const transaction = await contract.connect(signer)
                .regularMint(mintNumber, { value: (ethers.utils.parseEther(total_price)) })
                // console.log("transaction",transaction)
                // .once("error", (err) => {
                //     console.log(err);
                //     setFeedback("Sorry, something went wrong please try again later.");
                //     setClaimingNft(false);
                // })
                    
                // .then((receipt) => {
                //     console.log(receipt);
                //     setFeedback(
                //         `WOW, the Zero is yours! go visit Opensea.io to view it.`
                //         );
                //         setClaimingNft(false);
                //         fetchData();
                //     });

                // setClaimingNft(true);
                 await transaction.wait();
                // console.log(2)
                fetchData();
            }
            
        }
        catch (err) {
            // 1.
            // insufficient funds for intrinsic transaction cost 
            // (error = { "code": -32000, "message": "err: insufficient funds for gas * price + value: address 0x0bD045002056031154153cafF31336DFA3EBD844 have 90703250000000000 want 120000000000000000 (supplied gas 15013141)" }, method = "estimateGas", transaction = { "from": "0x0bD045002056031154153cafF31336DFA3EBD844", "to": "0x094A44a140Ef59b8Ebf9e7FA92234649Dc44Cd2F", "value": { "type": "BigNumber", "hex": "0x01aa535d3d0c0000" }, "data": "0xf4ddba920000000000000000000000000000000000000000000000000000000000000003", "accessList": null }, code = INSUFFICIENT_FUNDS, version = providers / 5.5.2)
            // let errorr = err.message

            // console.log("error-catch", err.message)
            // console.log("error-catch", err.error.code)
            // console.log("error-catch", err.code)

            if ( err?.code === 4001) {
                // console.log("User Declined Payment")
                setError("User Declined Payment");
            }

            if ( err?.error?.code === -32000) {
                // console.log("You have Insufficient Balance")
                setError("You have Insufficient Balance");
            }

            // setError(err.message);
            setClaimingNft(false);
        }
        
    }
  }
  return (
   <> 
    <div className="cotainer bg-nav" style={{paddingLeft: "10%",paddingRight: "10%"}}>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <a className="navbar-brand" href="#"><img className="logo_s" src="images/logo.png"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#zerosection">Zero</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#roadmapsection">Roadmap</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#teamsection">Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#faqsection">FAQs</a>
                        </li>
                    </ul>
                    <span className="navbar-text" >
                            <a href="https://twitter.com/zerozeronft" target={{target:"_blank"}}>
                            <img className="seicon" src="images/twitter.svg"/>
                            </a>
                            <a href="https://discord.gg/dDjBp8YF" target={{target:"_blank"}}>
                            <img className="seicon" src="images/discord.svg"/>
                            </a>
                            <a href="https://opensea.io/collection/zero-project" target={{target:"_blank"}}>
                            <img className="seicon" src="images/opensea.svg"/>
                            </a>
                    </span>
                </div>
            </nav>
        </div>
   <>
        <div className="container-fluid heroone">
            <div className="row">
                <div className="col-sm text-center imgset" > 
                    <video playsInline autoPlay muted loop id="backgroundVideo">

                    	<source src="./Videos/video5kren.mp4" type="video/mp4" />

                    </video>    
                </div>
            </div>
            <div className="row">
               <div className="col-sm  text-center ">
                          

                   { parseInt(supply.totalSupply) < 5555 ? (
                                <div>
                                    <p className="mintedcounts" /*in red*/ >{supply.totalSupply} / 5555 </p>
                                    
                                    <div className="progress mint_bar  ">
                                            <div className="progress-bar active " role="progressbar"
                                                                            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{
                                                width: '{supply.percent}'
                                                                            }
                                                }>
                                                {supply.percent}
                                            </div>
                                  </div>
                                  <div className="buttons_mint_div">
                                        <button className="mintbtn m-2" onClick={decreaseMintNumber}>-</button>
                                        <button className="mintbtn m-2" disabled={claimingNft ? 1 : 0} onClick={mint}>{claimingNft ? "BUSY" : "MINT"} {mintNumber}</button>
                                    
                                        <button className="mintbtn m-2" onClick={increaseMintNumber}>+</button>
                                        </div>
                                        <button disabled className="amountbtn mb-3">0,04Ξ</button>

                                        { error && 
                                        <div className='text-center mint_under_button'>
                                                <p className="bg-danger text-light">{error}</p>
                                            </div>
                                        }
                                        <div className='text-center mint_under_button'>
                                                <p className="bg-dark text-light" >Max Mint Quantity = 20</p>
                                        </div>
                                    
                                    
                                    </div>
                                ) : (
                                <div>
                                    { parseInt(supply.totalSupply) >= 5555 ? (
                                        <button className=" m-2 btn btn-success">Sold Out!</button>
                                    ) : (
                                        <div>
                                            <button className="mintbtn m-2" onClick={decreaseMintNumber}>-</button>
                                            <button className="mintbtn m-2" disabled={claimingNft ? 1 : 0} onClick={mint}>{claimingNft ? "BUSY" : "MINT"} {mintNumber}</button>
                                        
                                                          <button className="mintbtn m-2" onClick={increaseMintNumber}>+</button>
                                                  <br />
                                                  
                                            {metamaskIsInstalled !== true ? (
                                                <button className=" m-2 btn btn-danger">Connect Metamask!</button>
                                            ) : (
                                            <button className=" m-2 btn btn-info">Make Sure you are Ether Mainnet</button>
                                            )}
                                                  
                                        </div>
                                    )
                                }             
                            </div>   
                            )}

                          
               </div>
           </div>
       </div>
        <div id="zerosection" className="container-fluid herotwo">
            <div className="row">
                    
                <div className="col-sm-12 col-md-12 col-lg-6 text-center bgimgsectwo"> </div>
                <div className="col-sm-12 col-md-12 col-lg-6 text-center mbcol">
                    <h1 className="headsmain headset"> ZERO PROJECT  </h1>
                    <p className="para paraset"> 
                    Zero is the first Metaverse lottery project in the NFT space. We designed a collection of 5555 unique NFTs— unique digital collectibles living on the Ethereum blockchain. Your zero gives you access to members-only benefits, the first of which is access to the DAILY LOTTERIES to win NFTs including bluechip s.a BAYC,COOL CATS, DOODLES, VEEFRIENDS and many many more cool projects. Once mint sells out, we will be transparently using 50% of the mint revenue to purchase NFTs that will be put into play in our daily lotteries. Every purchase decision will be  subject to a community vote. Last but not least, we will live stream everyday the winner selection process.
 
<br /> Fasten your damn f*** seatbelts... <br /> Zero is gonna shake this space.
                    </p>
                </div>
            </div>
        </div>
              
       <div id="roadmapsection" className="container-fluid herothree headsets">
           <div className="row">
           <div className="col-sm-12 pb-2">
           <h1 className="headsmain colorred"> MINT PROGRESS GIVEAWAYS</h1>
   <img src="images/Roadmap_final.png"  className="mt-2"/> 
 
   </div>
   </div>
    
                        <div className="row col-fil">
               <div className="col-sm-12 adjust_para">
               <p className="para left-set"> * We will purchase the Bored Ape in a live video just after mint sells out. The BAYC giveaway will run on our #giveaways channel during x hours. Winner will be picked randomly by our discord bot. Every step of this process will be recorded and live streamed in discord. </p>

                </div>
               </div>

              </div>
            
       
       <div className="container-fluid herofour">
           <div className="row pl-5 col-fil">
                   <div className="col-sm-12">
               <h1 className="headsmain mbd-0 pl-5 col-fil"> LET THE LOTTERY BEGIN</h1> </div>
               </div>
           <div className="row bgimgsecfour ">
               <div className="col-sm-12"> <img src="images/wheelimg.png" className="adjimg"/>
               <h1 className="headsmain mbd-0 cb mtt left-set"> WHAT'S ZERO PROJECT ?</h1>
                   <p className="para left-set"> ZERO PROJECT is the first Metaverse #NFT lottery  <br /> with 5555 unique digital collectibles living on the Ethereum blockchain </p>
                   <p className="para left-set pt-1"> Each Zero NFT is a ticket to participate to in daily lotteries to win #NFTs <br /> including bluechip NFTs, and some juicy prizes... </p>

               </div>
           </div>
           <div className="row bgimgsecfour  ">
               <div className="col-sm-12 p-0"> <img src="css/images/sectionfourtwoo.png"  className="rotate"/> 
               <h1 className="headsmain mbd-0 cb mtt left-set right-set">WHO CAN PLAY ?</h1>
               <p className="para left-set right-set"> Only #Zero NFT holders.</p>
               <p className="para left-set right-set"> Of course, the more #Zero (NFTs) you own, the more entries you have.<br /> Much like Lottery Tickets…</p>

  </div>
           </div>
           <div className="row bgimgsecfour bg_play">
               <div className="col-sm-12">
               <img src="images/622.png" className="adjimg rotater"/>
               <h1 className="headsmain mbd-0 cb mtt left-set"> HOW TO PLAY ?</h1>
                   <p className="para left-set pt-2"> Rules are simple: own at least one #Zero NFT </p>    
<p className="para left-set pt-2"> For special lotteries we will add another selection criteria to spice it up a bit : The “Eligible Attributes”. </p>  
<p className="para left-set pt-2"> The Eligible attributes are Zero attributes that have been randomly selected and announced the day prior each special lottery. By doing so, we want to increase the probability to win for Zero holders that have ‘eligible attributes’… The more Zero NFT the higher the chance to win the lottery (1 NFT WITH ELIGIBLE ATTRIBUTE = 1ENTRY) </p>    

            </div>
           </div>
           <div className="row bgimgsecfour  ">
               <div className="col-sm-12 p-0"> <img src="images/wheelimg.png"  className="adjimgs"/> 
               <h1 className="headsmain mbd-0 cb mtt left-set right-set">WHAT CAN I WIN ?</h1>
               <p className="para left-set right-set"> 
               Valuable NFT every day including bluechip NFTs such as coolcat, doodle, veefriends… <br />
The community will vote and decide which NFT projects we will purchase after<br /> mint sells out in order to start our lottery NFT pool 

               </p>
  </div>
           </div>
                   <div className="row">
               <div className="col-sm-12 text-center imgset"> <img src="images/backgroundpng_webgroups.png" height="300" className=""/> </div>
           </div>
       </div>

 <div id="regular_lottery" className="container-fluid  reg_lottery">
 <div className="row">
               <div className="col-sm-12 pb-2">
                   <img src="images/regularlottery.png"  className="mt-5 deskpc"/>  
                   <img src="images/regularlottery_mobile.png"  className="mt-2 tabmob"/> 
                   </div>
           </div>
</div>

<div id="special_lottery" className="container-fluid  reg_lottery">
 <div className="row">
               <div className="col-sm-12 pb-2">
                   <img src="images/speciallottery.png"  className="mt-2 deskpc"/> 
                   <img src="images/special-mobile.png"  className="mt-2 tabmob"/> 
                   </div>
           </div>
</div>
<div id="exclusive_lottery" className="container-fluid   reg_lottery exclusive_lottery">
 <div className="row">
               <div className="col-sm-12 pb-2">
                   <img src="images/exclusivelottery.png"  className="mt-2 deskpc"/> 
                   <img src="images/exclusivelottery_mob.png"  className="mt-2 tabmob"/> 

                   </div>
           </div>
</div>

<div id="end_lottery" className="container-fluid reg_lottery">
 <div className="row">
               <div className="col-sm-12 pb-2">
                   <img src="images/lottery_end.png"  className="mt-2"/> 

                   </div>
           </div>
</div>
 <div id="parityection" className="container-fluid  heroparity">
 <div className="row">
               <div className="col-sm-12 pb-2">
                   <h1 className="headsmain pl-5 pt-5 pb-3"> RARITY</h1> 
                   <img src="images/paritysec_01.png"  className="mt-2"/> 

                   </div>
           </div>
</div>


       <div id="teamsection" className="container-fluid herofive">
           <div className="row text-center">
               <div className="col-sm-12 pb-2">
                   <h1 className="headsmain "> THE TEAM</h1> </div>
           </div>
           <div className="row text-center texthero ">
               <div className="col-sm-6 pb-2">
                   <div className="row ">
                       <div className="col-sm-12 img-adj"> <img src="images/18.png" height="300" className="mt-2"/>
                           <h3 className="headsmain  mbd-0 text-center cb mtt "> CRYPTONIS</h3>
                           <h3 className="headsmain  mbm text-center cb"> Founder</h3>
                           <p className="para text-center"> Early NFT investor and BAYC holder, artist and creator. 
Prior to Web3 and NFT, he was  consultant in digital strategy and is a  Startup founder (Ecommerce Marketplace)
He’s our Master Zero
                                </p>
                               <a href="https://twitter.com/cryptonis4" target={{target:"_blank"}}>
                   <img className="seicn cbw" src="images/twitter.svg"/>
                   </a>
                       </div>
                   </div>
                   <div className="row">
                       <div className=" col-sm-12"> <img src="images/32.png" height="300" className="mt-5"/>
                           <h3 className="headsmain  mbd-0 text-center cb mtt "> THE NIZZAR</h3>
                           <h3 className="headsmain  mbm text-center cb "> Consigliere</h3>
                           <p className="para text-center"> Nizzar is an OG in the NFT space ! Early investor, early BAYC holder and currently managing a 10M$ Vault called’ UnlimitArt’, 
He drew Zero project roadmap with Crytponis</p>
                               <a href="https://twitter.com/Thenizzar" target={{target:"_blank"}}>
                   <img className="seicn cbw" src="images/twitter.svg"/>
                   </a>
                       </div>
                   </div>
               </div>
               <div className="col-sm-6">
                   <div className="row">
                       <div className=" col-sm-12"> <img src="images/42.png" height="300" className="mt-2"/>
                           <h3 className="headsmain  mbd-0 text-center cb mtt ">LOUIS</h3>
                           <h3 className="headsmain  mbm text-center cb ">Developer</h3>
   
                           <p className="para text-center"> Master Solidity Developer in France <br />
Louis has worked on several DEFI projects <br /> and have been involved in several big Nft projects <br />
He’s the tech guru </p>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-sm-12 setpading"> <img src="images/44.png" height="300" className="mt-5"/>
                           <h3 className="headsmain  mbd-0 text-center cb mtt "> SYED</h3>
                           <h3 className="headsmain mbm text-center cb ">Artists Group</h3>
                           <p className="para text-center"> Syed is The Co-Founder of Galictic NFT Studio 
                               <br /> along with Habib and Talal. Expert in 
                               <br /> Design and NFT Token Generation.  </p>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       <div id="faqsection" className="container-fluid herosix">
            <div className="row text-right pr-5">
                <div className="col-sm-12 pb-2">
                    <h1 className="headsmain cb pt-3"> FAQ - Frequently Asked Questions</h1> </div>

            </div>
            <div className="row text-left">
                <div className="col-sm-12 set-colend ">
                    <h3 className="headsmain  mbd-0 cb mtt "> What is the total supply ?</h3>

                    <p className="para cb"> A total of 5555 unique ZERO Character </p>
                    <h3 className="headsmain  mbd-0 cb mtt "> When Zero launch?</h3>
                    <p className="para cb"> Presale for Whitelisted people will begins Jan 19th 2022, 6PM EST <br/>
                                            Public sale will start 24hrs after, Jan 20th, 6PM EST </p>
                    <h3 className="headsmain  mbd-0 cb mtt "> What is the mint cost ?</h3>
                    <p className="para cb"> Presale (Whitelisted) : 0,04Ξ <br />
                                            Public sale : 0,07Ξ </p>
                    <h3 className="headsmain  mbd-0 cb mtt "> Still have question ?</h3>
                    <p className="para cb">Head to our Discord to learn more and ask any questions.</p>
                    
                    <h3 className="headsmain  mbd-0 cb mtt ">Where will the revenue be allocated ?</h3>
                    <p className="para cb">50% of mint  will be used to purchase NFTs for the lottery wallet.  <br />
20% will be redistributed to the team <br />
30% will be used to build and develop the Roadmap v2</p>
                </div>
            </div>
            <div className="row text-right flexxcol">
            <div className="col-sm-6 herolastone">
            <div className=""></div>
            </div>
                <div className="col-sm-6 set-colend ">
                    <h3 className="headsmain  mbd-0 cb mtt pb-3 "> What’s the benefit of <br />
                        holding a Zero NFT ?</h3>
                                            <p className="para cb pb-3"> 
                                            Zero NFT gives you exclusive access to our daily lotteries to win NFTs including bluechip (s.a Cool cat, doodle, Veefriends and many more…)
                                            </p>
                                            <h3 className="headsmain  mbd-0 cb mtt pb-3"> 
                                            What's the next phase ?
                                             </h3>
                                            <p className="para cb pb-3"> 
                                            Sandbox land, Fully immersive lottery in the Metaverse, Mint pass for our upcoming collections... It's only the beginning and we are here to stay (Announcements will be made later on)
                                            </p>      
                </div>
            </div>
       </div>
       <div className="container-fluid herolast">
           <div className="row text-center" id="footer_block" >
               <div className="col-sm-12 pb-2">
                   <div className="main-block"> 
                   <a href="https://twitter.com/zerozeronft" target={{target:"_blank"}}>
                   <img className="seicn cbw" src="images/twitter.svg"/>
                   </a>
                   <a href="https://discord.gg/dDjBp8YF" target={{target:"_blank"}}>
                   <img className="seicn cbw" src="images/discord.svg"/>
                            </a>
                   <a href="https://opensea.io/collection/zero-project" target={{target:"_blank"}}>
                   <img className="seicn cbw" src="images/opensea.svg"/>
                    </a>
                   </div>
                   <p className="para pt-5 pb-3"> © COPYRIGHT 2022 ZERO PROJECT | ALL RIGHTS RESERVED ® </p>
               </div>
           </div>
       </div>
     
   </>
   
	</>
  );
}

export default Home;

const whitelist = [
    "0x5640b69884608871d31b0b8abe5be8386aaba9f6",
"0x59a19046ca64377d212340272487c7d4efc34b79",
"0x2e397cc220946a967fe0adf36fdf1748e6664821",
"0x562f37cd8d181929f1a7735ab916c95dbac3d2ce",
"0x1724f1d80210eb4563e94ffd95507fc63e324355",
"0xbcb891fc47d2137f8565e72b9dc5abfed7a3a348",
"0xf0c2e9aea3a34d5fee427933be5a05444b02b8aa",
"0xdf58415b974e75d547f698c426dbbc0b08368e4e",
"0x2b2296b4f03ff4be1b3e4ce9faf322dc5abea4e3",
"0x94ccac8f33c1d9b03b6991ffb340179898b9dcac",
"0x55dad374074ad61d8003213149940f289cbd12eb",
"0x56f523447e837b436fe9cd9c57f62bc1ebc0f2cb",
"0x27f5c03e38ac737fb18619929ff8a895f496435f",
"0x4747293a0102a922e88d12e40c630798684da2ab",
"0x4fd87175f7f197e476c2df7f8e1d6e3da940dd78",
"0xa15a659f75eaa2fee83008e56a48ff6a7461658d",
"0x4698917d0f308658270faf65973a9872b99215f2",
"0x4ffdfd1782ce48de267ecb0854889836a10ec8a1",
"0x97f6b0fc006e3359a8bc3d65ec9316d98d2992ec",
"0xfdb2f4da85124e97c6186f5692f23b4032093f8f",
"0x1ae3403c62cf8ce1f50dc8e88ab8e67faf362f37",
"0xe091ab8213554dc87f0fba964ce995d1fb1263c0",
"0x028ab213aad483230fb51a957db3c0a9c23c9d09",
"0x14faa125c62ac8cfe9fcd2d97ac05347c93fbe6c",
"0x8e97ae3878cac64f2395758c5dfd5ec0014f3691",
"0x1713cdc52eeb87a89696c7dca019d9fb8ea8fb8f",
"0x8027e4eaef12dae0b5a68b81be3ec46a88e6ff1a",
"0x6a5a305787dc71083f773f2c95822d743f6d14c3",
"0x9acd0c4bdf6e599312f7e5e0beb24c4fe8f05764",
"0x66db0a940533ed7190a8d4f36d1dbd8d82765a65",
"0xce716900d1e7fec90ed065a9aa8b9069af944d0e",
"0x98dbfa7c90787b7e6919863a6fb92cc15241612e",
"0xc49c970adcb3510ea9906e5a3eb8ac044dd8243b",
"0xdc57a1301692e6dbe44334deded0cebe6c3150cc",
"0x19cc62b1ea21cb755adfe01642d18141c600571f",
"0x222c670538fbe4f0bcdefdbee7223a26ae6948cb",
"0x2b0b121ef8b02c3c5bcfff8a882300b8ecd90810",
"0xb0d5bd69ee44340119d881e470028976a1cdaa8d",
"0x8e7fdb2de653a514ffc9f8fb2233e3c9c918f53f",
"0x52b9e5b64c31511d7e310094a60c6f6c8480dab7",
"0xa87230dc898251336c093ccb1a9ce839a013fdc1",
"0xed1e0e2549d13d23d87bd8007bce1139f737ca74",
"0xb3311f079ca6f6524e73e276823d76166f636b73",
"0x40e8121afdafdbdbd96e4e6776fe859b8810570e",
"0x92aa8e36f19fc661fe1cd36e28a09fab9f094792",
"0xd6fb84c15b1db268f2c6b5abf27f4a9811165147",
"0x5f19685c1d9e8b5ace5e21babbeac40ff0b60a08",
"0xe0c2f13e713e7781153922ad11bf3ab22c9876b7",
"0xc94662a681d62357c72d29d3bb14f8a0713fef5c",
"0xf2df1d27c2a64180a3d3e07e655ece4be82e18b4",
"0x828ef9c164907a50d57baf661a39e2ac808bc35e",
"0xcdfd1e510f5008b7720818418a49383aca78b88d",
"0x44eb189eaf8fef9fc518e99344e70d327cf8e83f",
"0x1b86d6de82a45ac0df8f0a7d74195b8b2c759e45",
"0xd5b43eb2ef37acc15b8079b7cb34b72ac8a91b83",
"0xc631e4417f8bf82eab66d240cfdfdf60b973ead5",
"0x3b72debc48ea394b753a567ec467e1d7f9532718",
"0x878ec45982b46ad909b3458a9842e52da8791d1e",
"0x52f36b7e2773a83faf86a094d106db0ae7cab2ae",
"0x8689941621e8581e7fafcc893f8c6b26a307226f",
"0x6b65df04cb7c62c6cae1aa58c9c8b2e52f014607",
"0x6d9d2377666c6518a6e88cd9dedb068f94d9a330",
"0x1b1e3e9132d662ab8f1d55d0e8666a53554c0af8",
"0xa9c5539bead67a6c18cf4e54b15352e4392786d1",
"0x03ec9238041cf1d9b53ccd2fbc21df4fe469f296",
"0xa0451248bbfce09ca517d92cd7983cc877d78dc3",
"0xa206ce269ec35f8f8eed7d1ff7cc67926db0aab3",
"0x56efe276526e84e035d7df5160a1b3bc0c39a480",
"0x9b38b7c16e8cf836fa6c74836e89fbc1ae9f556f",
"0x7adbfe80e59dd8953f9420bbf00774bb387a2ddd",
"0x57367a753010925ac7b4f16b1d1ff54dc281198d",
"0xa861aafae01b520357d1ce1bbc98743497a8ec62",
"0x0fca5fa1a32b35e861d0edebdb97f9bc1cf9cb69",
"0x267e777e0fda8a2f1bd521f6b0bcece55df3d3f6",
"0xab3e1a89657504fc68bc60ec36a80cbac20d2eda",
"0x19f0714f0c45c48316db0c318b2a64857f27cb52",
"0x92ab10c1d7030e81904d111efc74f2b3da688499",
"0xf6bbf2a17323a677a762ed9d37b1a9b901fdf96d",
"0x3a29855d7f6f0c7a0b949b7692cabf8fbcbef864",
"0x0660fc2db4ad1f9e5db1aeccee3f7b9ad4d10740",
"0xc44f76ca437e522720c1584af6d23fcb3c304832",
"0x3e3f8059cb9459ea598e2ffd5c24fadf121067fa",
"0xf67d8425a751da038e201349866f3ddfb526a910",
"0xe4b505f6b5a9c3b896a6b7d0601a995acc79d9f5",
"0xfeeaae6b15121695a824ae4c9a6ca8be61058387",
"0x3abeaf9fe6ac2d53e1a400beccc86e380cb95d86",
"0x61e8879c33eeb685d67bd17524d1fc0cb1dbcde0",
"0xc6909cbc10f591b7b17e068762e896fe54cc05e6",
"0x17dd6194be6c000df0012a08fad0d3cf25c61c54",
"0xd4b7e82e01ba934c6e4df49f718239db9c2c0fed",
"0xea4ce13df8866683f9461dca8c002c0e76afcc94",
"0xdb7db3a7792200fe81ac64079155959be0fbf4d3",
"0xef8ccd0b18b754da5a5b2065c39ce231a8a81ce0",
"0xf3120515a489700a53a6f56178b153c61caec1df",
"0x68dfcdf5bd75dd63944ebf7c7a043b1e6279cab5",
"0x4a4e0e3cccad43404d5ec1c429380045189edd65",
"0x5c9c832ee399ecc18c61936f01555ee84d54fb50",
"0x1bf32181e831dbc781eeb850d58f801495c4c93d",
"0xd134f23d5c6f00fde875dc4c56fb892c36c58378",
"0xbe05a20771197bc66218e062d0033789f35745ee",
"0x8958fd1c47948306a63f68582d8789035a2d70c8",
"0xb4fd7ad55f4b67588dd074d3e08bdffb646f90d5",
"0x3e363f166985a48c20315f9d5b002a10070b8166",
"0xa984c898861aea98a35f3d3d6825dc879eaf57a4",
"0x3da66aeefb0a722155a0075a33bcb531d157a8ed",
"0xb35a2d2033f683460c240e10a73ca1c26cd1c49e",
"0xaab78d804c01867ca233547e801734295d8ed8f9",
"0x0699782c90d47932e6aec5446c204579b92c8674",
"0x06793850a8c0ff839776b23c7ab639461dcf3afd",
"0xb0495377794961171d02778ad2355164e28cf7cb",
"0xa458b58f11cfb2588d3788a726b1afee332b1593",
"0xcd8d721536334cd16b488a1ae38b93c1080d9e4e",
"0x8bf59dc4fe14a0052323cfff986887e8fb7c13d5",
"0x8fd974089b612041c37eb643980c2a9c9ba85058",
"0xb6164af04291d3aa4051ee78943618318e3f5cef",
"0xdc0f688d6ef8c959bc3e5ba7de7d446302d3b0ff",
"0xd47bc7ba103d66aff66a511aea87cf8f8b80fcd1",
"0x74c996d9e20f40241a9eb6e9ac9530d124b0297e",
"0xf6eb949c4766971ac27d9c0c43172bb085053394",
"0xb63cd9f479c4f0f660dc84da5c28d2d1c996b6fa",
"0x261ac389da4a1da58bac4c57747b6b0caaceaee9",
"0xe823c38b4461fee1632bd4d4fd515dd81fb61dd4",
"0x784f72eebfa5b8a667d2fec2ab720baff1b7b170",
"0x36542ebcd02c2d2889f957ba82be2b908e60e8ac",
"0x0ca40cd5c9b3a0fdc62616579e35e9c0ec3d1443",
"0x46b2031f44961f139179553f24d32f0a24157056",
"0xc1dcad513b8e066a3f27dd5cc3edf0a920645bc4",
"0xdb3a942667532764fbe63a820a6b42ace044a7d1",
"0xa1853b0ca43624eec05b85c81e2841e96ef2f99e",
"0x0bd045002056031154153caff31336dfa3ebd844",
"0x6bf06616e493fe1cd33ea2941fce407cd9fc6eb8",
"0x594748d601071cb1385ee886276177d1e04d7c93",
"0x499c3072e5ee2a4139dbea34cecafce4753d0433",
"0x4c97361f6d41f1e27daf636114f0abaa61459167",
"0x40ae835c58a243435388469903484caa6bba2394",
"0xc30923b6999db5ed7991edf9c48e34b74a98d87b",
"0x02a2993c6ff096b444f5d0abfad8af34c71cbadc",
"0xbc249ea79a64add0c1124abc57aa66c53f99b79a",
"0x2eb8a35828c7ee6fb023e17b383706969b0e4b84",
"0x7b2777af07c3261c69b4586a130f183d63a47dc9",
"0x170bf64d5ce7ee203ec973cb8d0d1b78a075a263",
"0x2bba339e12af4b33e3301ad67576dc16166302cf",
"0x6883271e3d0080f51faf5dd77e4b588764ec99f2",
"0xf64aebcda86b57113a8f2e33b7f90f49e4ca4a66",
"0x267d29d4a5c5ada5099b6f46de7f4988b634e4ee",
"0xac0a7656b5d62e7d54b11f8b5294ce0ac1bb7118",
"0x37c63c3d93c304796c9e21391fba295935328a63",
"0x328a6cac6ebafff231b2d74da98e3d816ea40b8a",
"0xbec2ed4bd46e3814c834086d538cc7d821d8a591",
"0x92d994f2fffd4cdacb8bf873bb0dbe061de700be",
"0x4c51a41e8c42b73aa3ffbe8ee6f453cedd660228",
"0xf9d1bee885f33ee99bc47ba2a24b00df85f8fba6",
"0x9133f68392a8dc204fa8dd2e023642d769a24096",
"0xa3e8daa098de96828bbadb4b2ead3b6663cb49a5",
"0x54f3a60530ee4e56c84b83aba145765396f1be35",
"0x4583348fccbe372383f3d6b4bb4115523bc49c23",
"0xa7f0164aa6d10b0bbd945f3ac4614c058a104704",
"0xfb3984cd0ff995443f5cb9279a03ad4893f08cdd",
"0xd1f7a585322fe3d8a4c0b9b732a91ac90b37b0c8",
"0x978c6eb151aaa23d7a8659708a913e01c0b16714",
"0x45771bcd291d5be389e3b2fddbc854a77a36047c",
"0xd985ab5efb79ef9429dba1e0bbf0490b738b76ad",
"0xb1689a769b457699317263d0a988855e1f68765a",
"0x9d03a0d767269882941f7ec7dfd2be63f0abb9ec",
"0xe52c023f141d076d9d644337b6b16e1e25bb19ed",
"0xf532b7240cbf952751691c0e22a681a792ac9b61",
"0x4e208bdbbc6b32ef41c968af4c406106eb44f1aa",
"0x0c1fcb220cd627566e8cb8f0c9dff4f56d69b51a",
"0x2fd43a4faa3f982fed12a037a96903af0801b35d",
"0x89eaaf155a13418cd1ad0e939f728462969b7925",
"0x49dd59a4d752d4676c76de3892473f62c544f9d9",
"0x0327f7870e098a8f19c6a0e5c05ffbfeed3421ab",
"0xbfcd10314f79fdc33574c06c4e1d96dc3712bf28",
"0x70d9f98ea60658fd81cc54086006e949aee207f3",
"0x7161834d255cd574f8c6074df87117f1e065cbb2",
"0x86708151c69ef2a95d3779a8c07f4a994b6951b5",
"0xe1fb324e723d30ff62bc0ab19071d2821bc60f96",
"0x535701294033ffa4c6f1156a7881978513a23ff9",
"0xc5219714996df4ad38eba5c9ef870e2a9ff06c42",
"0x7ceee7a8d1aee6034a7a71b230461898b42aaca9",
"0xe44044f91c29fde60b618a11d4baa26519d7f750",
"0x7b78a687d8a6790e1b67b9784ebff492b3567e62",
"0xe7487a038d39dbc7081ec44fa51b2cb8936c241f",
"0xb954ee7be24bb9bb8c66299b35c19fffffde878d",
"0xa3b6205a93ae4dffff2d6f3ae1da0814b23c2bf0",
"0x6e353ecf29088beed9689f2a972558163b1d5bee",
"0xc6fdd9eb826a1909e35b0be312d16844297c0d19",
"0x7683803fdd89f6b7fe124c8711542b2afd2f610b",
"0x06217cd389fe0b598cfaade7e2e3c8a544cedad6",
"0x57129eda320aa667c402d4ac5a46ba4e0e368041",
"0x761f05c2ac70d22e493b26b3050f8d3f2ab72c1c",
"0x913782500cc8acdfc8afa2591222d4ad8771a9d1",
"0x7e5eb89d7871860f0cfee7c9795ac8a46743856b",
"0x36f050201e2f13c86758d3ba7e7c248d7ae6d42f",
"0x1c844fbd946ff35385d636953017cee2781db754",
"0xmystic:clap: you're the number 195 on th",
"0x121b16bc6ef6acdfc4323bc422f1e940ef8a7335",
"0x4a5c27fc6d10e8a0fec4f2d504ed5bd05b4a4c4f",
"0x549069f73d5bd3bf0e266173d50df61533a31210",
"0xa0cc71b5a5f85336efd870cbd24f9f4f5cbd672e",
"0xe0267f1f164486b6f8b52a183a9fc5ed6ff41ab9",
"0x70e6e45bf45addbe958e8f22b5f52dbc3716b0b6",
"0xc9279c5d7fc4af3c45eef879e9619c5a39eea307",
"0xc0bbbd162474d0c41fd84db9c67c9f8a11d6b70c",
"0x3f43815c9fa987afeef3c00d04a93d61b34c5d83",
"0x50609f43caeb25a18ddd7f97a7eacf45706e61b6",
"0x23e7b7a73c4ccdeae2e9faeb852faa0c14a6c9cb",
"0x82c4be86c8ebba4eb42c1d36c398732342949e61",
"0x08003dadc2ca92011acd55eb06ea97ae5f473de9",
"0x962e6d3cc4192159ad7d8e54ac855de00b5aa0e1",
"0x5d7c9547f4ed67302b0edbf359bbfa4cf47bc6d2",
"0x348432b65ec12f551c965d0aea7a828e12a7e569",
"0x8e39ed8a9118932057147f474208808b0e0ee93e",
"0x164db79d64f1c75fecaa1fcf8d6c870c2a4b648a",
"0xda3275ae5a24db98051766e356917489077e63d9",
"0x1744c9c06f973f67dca3c788ad7532b8fbd74067",
"0x87dc511fb370c04f250baaf807301ff40bf53eab",
"0x0d8693512f10316e9188ca11465df7a8a12b24eb",
"0x8c1ffd11b9cd30fa2237a9bc33d3ad17157acb6e",
"0x8e6de09cd2a5858e8fea7bfc182bbf2c52603441",
"0x4e207c61d79ef29e77e64dbae3f21c0c0ee2e68b",
"0xe46b4f3862f617386bf8d5c97a7360aac34b3ead",
"0x4e87e46312baddf3f372867962cd51584343912c",
"0x31aca600fbeb0cbb919222fe13cef07fb5d00dd2",
"0xbd40a2a8f74ac9d0a031dfe28b0d025e5931a359",
"0x4cedfc9444b452701f6811f5f27ab44199495ac3",
"0x3a9509c5c260389a5a96110cfd848bff370e18bd",
"0x2ac04b0d647b8b0cd3745bfd6d3073345ecdfc21",
"0xa5c28a7f9e2306cb4498e0203ab0f82040a9e5ed",
"0xd9dc731caf241acc7daac1510046bf31bdd5772f",
"0xcebce115b6f4adf63e0e61dc431d674aa3613ac8",
"0xb223f1e9a2a1bdbcfb8d7a1eb06e6dc1ac7fac4e",
"0x5ba6b79791acd5a42354b7f35c1f5b5ce3520a60",
"0x6161ac6a654ee4a524b8c68bb31b48ad9d2c5537",
"0x413a45a15d3c806784c1a177134b1a925e751686",
"0x9cd4f88808ad29037b8a4c78ca3665fc2c1cc541",
"0xd7a61f2c6f27dcb09b466995c5ce1da8e669d045",
"0x3dad5a9ffae28dfed48c18399cd26fe799da9604",
"0x89c14066d9b643bff11148ddbcc6c32f8e07c3fa",
"0x0dea515e43d7a201a789f2793ca5e3eb25d848b6",
"0x26bf41a6640daf61ff5cf8b2fef91e77afeb69ba",
"0x2a95c20a1e6f6565c3335cbc6fe4abea1512b9cd",
"0xbbfb792fb33529a7707540b837eedc3be7a177de",
"0xe5a79743b3eaff0a340f0dce4a96d2595463120c",
"0x20ba1e659169e827b6d5adb1462626f8d5f9a388",
"0x439f1781ba6761e85e9f89a248f4772d94382bcf",
"0x484adef8f940c01b79f8603685ccaef84c259b01",
"0xac19097a1d482df3721eb8c2e9b71748a9823f0c",
"0xf4bdce8601690808643e29f9b01c3b6932aa05e5",
"0x3ad12c262f77ced74b3221dba57719130536d240",
"0x369615bc57975b06c418f42d3fda3754a385b97b",
"0x910947ff1342515122a7bf38f4e80afc3b4e4a27",
"0x253ac566c29ba202a2aa6463da52703cc94e4b82",
"0xf4c2be5f928600059a006b078a929d7061a378e3",
"0x25a5da26816d7699a2d26b15b8497106f8ec99ac",
"0x31c55f64cdd0dceb6a3ce2174044ad9350e2c337",
"0x010b53d0dd81922e76efe866058d42625566da7c",
"0xb37a62a3503ac1a77090b4fbd1c318b5c808c565",
"0x37f730b7bcdc7fc84f00820a3c1098dca28ff508",
"0x92f4d4b2d9b85394c9e30006e9d0cbc0604b5fcd",
"0xb781f6969fa9a2511837ca13284af1e807429368",
"0x01476cd5b0da73828fc0d2ffef760c6d233aa3fb",
"0xaa3c339ba7dfb34196327feca0a5a6f4bd5f5c1e",
"0x21e25faf32e2da79f49dc8b154bedaa7319a6cbb",
"0x3ef4b60e9e6d27f9faba607dab9e7d4e4965a5b4",
"0x3662a170f265f6c0b548f7c09b2fd076ad31b160",
"0x3482f3588214655da80d504c9b755ae3cdbf271b",
"0x70169f427e3352c720f1749c79b6d2245f7c5c02",
"0x524e3973133b0d79e3840e74abcdbe4250b04d63",
"0x1ffa95d974b2c2446f5092576ad2862c511f231d",
"0xa30665739cffa17f7be215699f7bd31e7b468c0c",
"0x8cb683ac4879d35ebc4711e08edafc6ca10b18fb",
"0xe1ac0376d45a3c6c95b88137b4e3e3c8730332d4",
"0x95e3486d02d5cc4adb6aa1552b33fc25d63c23e0",
"0x6b3efbce9df6059913a9e88a1bdb92774b5f83da",
"0xb995232b94dc467d9b7ea9a5d787a11d2db2e493",
"0xccc8978349413935c2e924153b31e1497ed43d54",
"0xefaf22d5bf62124c827fe368200ff26c68b86e1b",
"0xb3519e862aeda080320c564f8df8ba30370407f1",
"0x28d665c7546f6f23cd9c63daca239c4259ccc15b",
"0x88d3b17aa3aec273eb4e353924362f01bb8f629f",
"0x7c5a17f0331321ca9b2915aa5a4ee5173c8df1bb",
"0x9799b592a9430e1dc1cd5328c5735f00b22fc8cb",
"0x8db88cb0658d072a5044d885c2fc8391b0d10a5c",
"0x6ea07015be17f3acd5507fc8abe8c1f573981781",
"0xb0e56abcbccc25f5a03571f2998e3a33e495e0ed",
"0x709cd7e8024dc5e79799ac1b0f7e0d11c91a4586",
"0x37cb3af3b62cb5a40b9ccb0343658051e642203b",
"0x155e1087ad2bc56e750f2e49096bebd069b59576",
"0x70d7b21f7585c02a665ad6ac0c900af0ceab2b55",
"0x6929376020d0b3eef517f176b1c81596d08abe50",
"0xaa332bc0cb009879cfaadc76183e2cb62b74ef50",
"0x32e95b10fbad05fc0f544f2bcf719985d0c9f052",
"0x3c8ebdece6a1aa947f6eb1f582afdd86d5d819c7",
"0x43074973dd0cf530ea7fa7beab41487da12ae68f",
"0x882eb53c4531f2e9b904e266e253a1fcb85f78ad",
"0xc109a29a3e57072f084d2abdc34929c3801e61aa",
"0x9d097dc642e33fbfdfb75f18c60aeac5e0190a59",
"0x38d06f6adaea93fd521264e8fabece3e66eb312a",
"0xa84ebdf99fbe0c48b70594289c9634430e356d4a",
"0xe563f9a27995b2799a7e481e4be085e441d1b7c4",
"0xa05197b433affb39ab01b47cf7ea588e77da1e89",
"0x9db5a19b9f388f49012f33995a12609a1e9f80a3",
"0x6239f28d36285828d36da10ade994b25413f314f",
"0x462437218678e26cd8314d7ef3ddaa5a26887e64",
"0x5e0ba8c2dc5cf1c9907c408f2a788cc9c1b54372",
"0x4f0207e33844376386554da08de4fb9e3893ae43",
"0xbc7c6f1cc8cea685e508c69f05ce6be01aea19cb",
"0x958d2a76a217557c4e85ff05e400903b3588c865",
"0xdfc2e3310f9fe89714aa4f8d8b62be1fb5c570fe",
"0x85064ab45c9a41ceed327bfefd65e6653efa7422",
"0x672fd3d5568c1612b51cf8947cad30b56afac6e4",
"0x73061b3f19890f66b45df33170eeac657340a8f4",
"0xe59ae36e5bae62cad60d01df79cb2699e74ed182",
"0x73670ba1814a1e06e31e78ba4a4bb77293cf37d6",
"0x1ec4c3f0807cb4ca34beb9a94c50f2f10cf531a8",
"0xbe492fb1721f64bee7bf63432030fff25d0e20f4",
"0x8e6f65a5945f0fdb7d71eb4eafb1a583877d848d",
"0x7700f9384faa070cb7b296224ef36dad34ff55fc",
"0x7e7468b93f4ab4e9eb15742ad35b847ae24c0443",
"0xc899945d8679d052f594be758ea5039af7f37981",
"0xb47b6b6160aad8cb71dfd151ae06e9a9c72ac341",
"0xb0c0c14c59a078c438661cddf2c70a764e980ec3",
"0x74fffc635b39e5341b95631e01a3ae21c43df683",
"0xbcab271ccbec43e286d056a611bf3959f4276bf9",
"0xd8309d7723b8413f4279661b71166c89553a150b",
"0x64a91aceae7331e22a599a4538622ab137e76c2e",
"0x7fde3b06f2746d01dec31776d043df7eae8bf385",
"0x28b9b17d464ccbf496a3d94caf336da9f7d28748",
"0x6f91888cedb9f491e95b16170e18d4ae73118ff8",
"0x3a075aa03c8062fe90656aa8f04dd3c83546c8a1",
"0x19aba4cdab6a8b8a872e84cca10c0a563fc4e5c3",
"0xb6e1a571325711840b5da66d38caeaf9f599a987",
"0x19f0d2c9b26899c2424a4d308cd4e1b2aabefcd1",
"0x838e6632956cdfa7bd5d34797bb5f2f023a21d3e",
"0xb5e2e5f376c61f40485bbc11d5dc56609c2c0db3",
"0xeb8bcdbc34d7d69b9e8b067c9a5b8b63a2c49edd",
"0x99f1e6c145a6be78d129aaefc043a15a1163fb56",
"0x6c2f39df4e989172647e033bb1ecb79ee91e67d7",
"0xe96db623c2ce30f65171f5fc487127748d1065c6",
"0x95c15d1dda7c8b1ed68a70e31af5e80551217607",
"0xf8d75dc98db0eb5d650a37fbe4a07689a689b25e",
"0xba2fd352b52b284ca24e69cff367c1e98a33d846",
"0xfafdc6e2ff5fce46cb2e082a78be73df9e3bb83b",
"0x4cb298bb77b98a0f68b47cef292206d3855f7059",
"0x37549942e1bc3ff4cdc712d8e26e1782bddda3be",
"0xaa40b62eaaf5d5d8f2bd884bf1e8eb110198293b",
"0x535a8757d22668ad76d3a3e73ba3d5f411174709",
"0xa3ab02c8d67c091d0ac540148801994b75a42592",
"0x6a1b2f411294ae3d5c9cc502ac3445b71a172fb3",
"0xe600846eaa01894f1ffddfff74d81a31cc97a417",
"0x301cc656c9469b06716dff3e9fc498afacf597de",
"0xeec5ac9f1aeef4a42ba36ccec0f973ec3ef44f39",
"0x8decf4d541633da13e89717b4ad4a692176ea7d4",
"0xe311ac4bd04e4cf8982d2f17b7094fd8d0cf70c3",
"0xdf09a83555306996ce382bd29ab5b6b2dadabf7e",
"0xf03776b20afed0301948b1a77b2f8215ca9ffd73",
"0x246b5e63f7eb84ddd657796ada057ff25581d502",
"0x8f626958ec428d258f6481b563126640f8aef54e",
"0x48cde166f537d34ac3955f9a0e882f305fad1874",
"0x3f865feaaa8e6b6e02ad4a334e30dd4461559f06",
"0x3b7aebab4fe9536972fdfe58b0bbcfe193055fb4",
"0x7290a0be888ccbe886283a3d43cb4f3801e57bca",
"0x9df087ada77af80f553dc0d2fb43c18dc5a6b444",
"0x96626216252053cabead68f37b7bd8386f9ce75f",
"0xb9b125d08dfeda7b1b3405c2752260eb64b7b261",
"0x965a8e0dcdeed52d6c3aaa593c77ab4434f0a47e",
"0x99fe3dea15f2fb5a0ba1202f857976a231f97a11",
"0xaab511a6bdc9c8080d4bc7af1940245feab3d2a6",
"0xcd7ff04ca911aef8ee13393b285ad06e4822d496",
"0x5acebca05358208e56f31cf6f4e5e29bd9f58557",
"0xe892ce89e3520262da3a156a0d59192c52f06588",
"0xa41c1426dca0770c4a299b6b76058b6816521864",
"0xa9b0226c0d8428102397f19a4e9eae2bece455e1",
"0x06a745f94854bbe073b0754b495cebdedc919af7",
"0x348c262e054769324d4d88f5843fd66cad058ddf",
"0x73dfed4f1269d4ae7fa951a65b923f887513e18d",
"0xd0d2318ed62323f5e56e6fd1b98a57767405e0ec",
"0xad0592ec55ba611fb34674b534180fa2d05c0746",
"0xfcf6dddc92b9cd97780e4424d50f27ad04bd3f13",
"0xb6bf83440dc82946f84216f2d6541999436bfb3d",
"0x377291920a085607f6a026ccd2919cff1d62e19e",
"0xa9b1bdb7ef96a6d9ed06baff6887463e18ae1b93",
"0xb81d6b8294452cec52d5fac97220368fd86df5bb",
"0x4595a7ac00ae411a08c94cb02e1eca30a7bfa44d",
"0x8165118232d341c097f5cc223880ae2752f40314",
"0xcd607400e7d7006eaa69e2ca1bc252598dc6e706",
"0x0a06f20ba55086124fa61a44ae65aca7177394df",
"0x23371b31c3bf8408cff72ad892d9bf7e9c4e8f94",
"0x968c7fb6da5684c60fc4afc5e993b502a0085dee",
"0xa8c078bee4f3d33da13669d73f2822ee1000f6ba",
"0xcf1561890d28eae36194e3a589e77b2e98de2f80",
"0x36bef46dfd4e17f9c6cae37e408540dc7c6527d6",
"0x2591c560be6edbb92d29c6fec3c6eb0fbee0ef7e",
"0x53fbd57e1f38e360596f719bca5cc64e37cc600d",
"0xc5aa32182a7bfccbcad5907a334de1957ce4ccd6",
"0x69e19a3a975b5e333e4abd8c1afe0fe66ae707e8",
"0x75a2e0a1b249d113e8f53250ad966af3a17f86a8",
"0x00a969b5af9c9ecbded435c980923b088a108e02",
"0xcb675f77847c33f980ed76bb31c89b01d20461da",
"0x10938b1aa46bfa7ed40ed7bdb9cbd5aec6ce29f8",
"0xa1152f69f1c9ef6187a7e543190018f83a2f7788",
"0x59fd86c7b62f4f9be2de82054eeb6f740d24bd14",
"0x9197f339cca98b2bc14e98235ec1a59cb2090d77",
"0x0da6883d1beb1f0d8e1e1a3eb5d369d64d102f68",
"0x481db8e538f86dfd73889089d9408ca52f308ee5",
"0x6c2f6fa9417aafc0c09a4a867e24af6305b24a0b",
"0xbd7f3d904ecd0f5aa1d2cae9ab669ae4ad537676",
"0xaa15a96fba6c84737e632a93140d9f549f55338f",
"0x78f8c78a212d64ce1148355dee3f26a6e029ebba",
"0x792570f2775700a2ad7f0a3a0a8d834491713bf0",
"0xbfae796f6ed2bcbc6cf65e72a26c079a4eda8229",
"0xc37fee96390421274cdae6515427da083cb638f8",
"0x999baf549d6807b2c713ca112d81a0818eb09b80",
"0x9d5d7f4badf30b942bad6f5108b8d0b467043f55",
"0xa4b1c5181d49bca0626e2b8e93d090b1f34c3c21",
"0x150be6f86aa65876b7f643d1ce184f0c65847d99",
"0x91d5efd15df4c6542bc462d05c69a4984aba4228",
"0xce955e73f10b26465a887b475b7f39ae09b4c154",
"0x9b6de8a9bd5a9def98238dea780bd4ac9667f9d0",
"0x9740d81156b3eca6e7f51c947bb2407eed7c83fd",
"0xe99133dc1a2482827d659b9ff18c9afd654a93df",
"0x7ce212c9f9fe7e260665e212609ed923c929b2a4",
"0x354ab70c36afa3bc6ce93d8d76cd138dcf19c29d",
"0x010eadfdea46ed7f5c6ac9b95013b507cce92d4d",
"0xcba9f8eb2a92209ffb39837805ad2ce2e3cf9d0d",
"0xdfd071bb1df624372deeb478aaa52519bb347d7a",
"0xc2624c2926b24fdeb702e4488e6925a30ba75ef7",
"0x1460d3fee6498268ac3dd1048247a64e15e1684b",
"0x5d00f381c12db23640d0df46f7b93129b71dc926",
"0xb79918faff02d284baee7ff4768282f7f5e597c2",
"0xcbd2835a843d3683d66e263582b44f1594682b32",
"0xacbb4ab18c40b4c0a2cdaef9e3568735d2f1bc31",
"0xbcc471215350ed2c5b540993231d7684bfd584fc",
"0x3a8f3cd37f47f1e274cf869def1b80f14941ad9b",
"0xe3fb0f73bd1ef1541de171291d49faec5c495f89",
"0xc3e18b3b486b7095fb2312c49657260beb60d7d5",
"0x177285a6b63aa2f01d6914432a35adf0855b5af4",
"0x299d52b51724210186db5a003d1a147530667a3d",
"0xc5eeca42de080a546554977a955288c5c298f141",
"0x2c6b550ec68669983c6abf4fa47f377e583b3b31",
"0x73cee7f9eea967ab23c37e8bffcf6c95331e2f65",
"0x43936b16bb123981189a1fe478baefe04c9e24f3",
"0xc6fb76dd2388928236cd5fa2f2eb2730199ad2fd",
"0x346950eb1260b162371faa8c813a7d6b0ad3a5c0",
"0x17db12a7d2297f69d9987ef6e49b61f31ce9d8a3",
"0xcfaf4ab81a32b84286f6b116fae34c8c99966427",
"0xffea1394a5ce9e7de8325d2f3ebb220d450f790f",
"0xcfe0fc16baf9459e9c7f4f0234a04dc994580d0e",
"0x2df8380fb3542e378a8021379727b2f3cbf51a63",
"0x9f1dd7af2e9fb01a77e9390560d783badb5cae63",
"0x617ffb54868076b7e9ac5f527c80a920bd295c88",
"0x6c6a427cd43e1747e4adeddc56fbc9c8fa492d1c",
"0x75409cda56c5db767188802ba03b2064a7d29dae",
"0xd29a90f1bf234b11c06b60af8ac1aa7844bf7c1f",
"0x6f0cb6ff243b681d513aac047f967ea918d4c859",
"0x30a197cb7b3859eb64dbdf66afb41a11a24ccb8c",
"0x31ea0d363a0c5e7180a01e4e34920e64509b45bc",
"0x1b9abce324e9a67dd5f88acd7bd8f0a4549e1727",
"0x1391af29b482e0c32b717852d2a0d554aedda9db",
"0xc54ed5cef1658e3453d0ba5ce3ae6b9cb93c5dde",
"0xd3eb64e94e2f164ed7e9649df3ceda181e6c6e23",
"0xaeef6764113e64024b870aa207b3c2dcf1d54bda",
"0xb636a86f5d9fda7e6d0def6950f28d9964270af6",
"0xc381ba8173c9b91e63163374f4ebdd5ef619b4c9",
"0x03d851f2262c4e4fae4ff2eff4083c5b30575bf0",
"0x7ffbeccc52040b97d3979ef4a2d4d355d9f618b1",
"0x1971012550a973d1669b15a595dd723843c15707",
"0x13936ab75cf41ccb049dd3a6a8b52a89c9d79a76",
"0xd5c4a08b0e4ebb6bd2328a1bed29892894d0b016",
"0xcd20f0321df6304fc2721c120aeafb37ce6e5b8b",
"0x0435e35de8fa1e038e0fa81c380b11b28876d922",
"0x3746177036fa4cb78e299d4d6ddd628b0bc5d35d",
"0xc2654578c746c4fa2238d2d5ad79036ca956d254",
"0x368f6e75606d108fd9e9d85d109ceb7ca3933186",
"0x77306656f99b5ca26bf77d56ce0c7cafea121ad5",
"0x7ac2946f9be5504ddd3962a48c4039b61254b6bb",
"0xcbb0e2aaa2b94f60adc0f82da7d1a82d03794a0d",
"0x02849c5e549b9a3ecdea462cbb559b34e0b81cba",
"0x5ac88eaade1e91fcf20b90f9159705911d9d1518",
"0x6efd2c27a3c3ef67166804e425b03a33bd83f2a0",
"0x9e1674ae077959519660a9f4eb74d908ea082935",
"0x2143b543e580a28dbfda399f3a3baeb25a4df238",
"0x7b76ded44295955cf9df3a57275bb8a5e32e0387",
"0x0291572d64720bfbe5d85f6509cf3a4ed553d08f",
"0xf20da2f715b200bbb7bb130b4afebeabaaacd98d",
"0x899eee52181244ba63664e04b97547af83a37416",
"0xd857cb420dc45e7fb3e1b1296eb49d7e9c78eed0",
"0xf68bcf7fa37021bb731fe24e2940396009ea65e1",
"0x69387b384576764ffcd83f912bfaacb8f78c1c05",
"0xca1788efdf152f85c8fbed2b447f6bfe82b8ce14",
"0x0644daf10ea7ccc16ab5044f81248572c47f8328",
"0x9f5bafa2c9cd277239845ed5db3b11100026036b",
"0x830d369ce7f60defc6a801c6d8c3cc1f01129e9a",
"0x5987fcc372190505c91833a97322087fd4c9e4da",
"0x6754178125fa6eb0b001c6d94b02cbed91418156",
"0xd5d0ed296f4c73904a6f720354843c0430281743",
"0x2fafe9b54fb8619d42711b4fedc108860aa44514",
"0x27d5fe9f33c52f3db1d6d8f3d5b0ff8cd6548e3c",
"0x934eb9b0c4c68f685674724cbe0163477aaa860e",
"0x34bd4692a250847e4362ed891761356d5f35913c",
"0x75baa4c13f45923d0d712b2a8ff0330a2dcd0c96",
"0x5520427dbe97220ef94e769f4a9aeda2b54c7302",
"0x939cc6dbe3fe8564fc2b84a49cbeddb10060bf43",
"0x6619095dfd320bd4c7dac34a8cf1ba07f6fa90af",
"0xb6a4e643167ac0003bae29050b35815553700429",
"0x71887d3f89b8456a8413bd4743e642d6ace80b42",
"0xe1ea139f51b4e96a0e0e26e260827c656d8c343f",
"0xba0da3be5f87152878c77bdb7117db3b4f01ca86",
"0xd6f25dece70352fe543cf7c33c731d696cb802ab",
"0x25088bda816aaa730da5eabfc85fe49d153a6589",
"0x58ae3a4ac876051893863339f5b707ceff5d367d",
"0x83a8a2d305fa4ff95683b11da62e1c343af5e79a",
"0x7eb3de63cd40f8fba05898182a158bd4d85e7099",
"0x39e7cdc31c5817e43b5aa6c2fc24dbe16ed3c060",
"0xf61a47c2e2ffb144c5f62042997b5fa6de7787d6",
"0x51eb5033c1781449e26217e6af3fc214e27c5c9f",
"0x6e3bb5e59c667c9d78f70fa220df2adf6e953f3f",
"0x1df3f3d98bf371bf540f3f682433f43d8bbee8b4",
"0x1fbb269da807c1ac97831c70976cbc1082b71d03",
"0xfa35f69a6dd9ef80af40661743be519e30fbf406",
"0x7c7dc4eefd2a99e1681ae5beecf8410d587b1e35",
"0x4677a640cafd7fe984f5021ac10a0a9165cc17c6",
"0x9a23d93d626598edf449f36385ac3feb52dc94b5",
"0x3baf349ab50bb0b3989369832ade3a5a87c288b1",
"0x8cdbe8f90329e0cb69701c8d1e534a27e823632d",
"0x4c155a02fab3203c42ec118888a42767059f9313",
"0x64c107497d7521c7fd1489c0ebc1d38ed9e3fca2",
"0x8ed23ca7dcf6b781269d1a1f1677142cd4a6bce6",
"0x2a849a6e2db2ec977225947ea5d73418b7cc93cb",
"0x133a933c9c1ac2295c37f5bd13ccfde110df36e6",
"0xbcec35add294aa9b9bc12cc6debdf4fdd711d9f8",
"0x896962d5bbf05b9850d7c68a17e91b929690f29a",
"0x69f9db306b42c790b052f6b94dc957dce4b04755",
"0x9631d389a1fa14996d93d3bd1948a4e844eecad7",
"0x6e939d8983fcf0df8c71db2b8463d726b6bef0d2",
"0x5a6cca1fbf5d2707791b6a1add5dde868791cce6",
"0xb9f49e79787775ac41a17b0263078415acf5a9d7",
"0xb592ca9d11e5527661007ef3a1b28be3a904f560",
"0xca5572053d89c8602c29e23d51646f9aa43537f7",
"0x5175948d8accf0423867817124c734078743ca36",
"0x0b669afdc0c8eaf0fe3a45f09e0d39e042f01762",
"0x43de468c888b64ee03ed40f6acd164a2c4b8ef8a",
"0x5b9da1bc1bd1c0d2cef80a5d94d5f73af750fd69",
"0x57140a5ec315c7193defa29356b1cbd9a1393435",
"0xec9c9e07bc354345c156548a07abf65319f78ba8",
"0x761a290c3b94bc2bd4ec91ede6fbc7430ad351fd",
"0x44821de7155e32d6642ce3f7c381de5db3df8b2f",
"0xeeaba2d12979c79dce1d57d88c87589568cc70a0",
"0xe033dab96131689a5e260526197f1fd17554aca3",
"0x22f834df75267854f79fbc4ac013ac416876176c",
"0xce60eada80b2202bb6137cf001a54df1d014ca2d",
"0x68db5ddc2e83ecfec7abacc5618733748f69369c",
"0x4aced8dabf1e2086ed6b59ca8c1a249af2d9d0d5",
"0x1915d44348db531e02e045d01e4979b668d02463",
"0x281210a42f69c99a2406f68e6a2a3c5e20ac61de",
"0xe30430e390d4bc71cff0511a412169c71d121e70",
"0x26814ae9703e0ec3068fabe32ddf93a83cb3a322",
"0xb21655fa8ae787aa5d95f04655a6c36fda62bf65",
"0xcf70f1f98dbd2441539ae5421a7ef1741f8a26de",
"0xd0a7163287b66b3ff6b131b1f4d9158234aa9d21",
"0x036f848a410acc0034d0d41710303235f802eb73",
"0x12fa9008aa451b194e6735a205f3b2ed3e7253df",
"0x8440e08166f803adb6a0d807265841f2fbf9d890",
"0x5678bcf2374bb759b30a6ede0778d472fcaa9f04",
"0x36a050f329e7f495bead85f7bfd5b911aa4e159e",
"0x81093ff97bec7e0a499579ea4492becf3bc35b28",
"0xe544ecab3f843d64ec309c32f60f6019b5015f97",
"0x925783834ab0f0edd91ed2665fa878393ab93424",
"0xab000f9ceb02cf2389a0a951b8e28ac6ba7e1e92",
"0x2e61c2155903fdb7443636135055bdfa6f581034",
"0xe5b0d354a016b783947f32698f5eb35f50843dd4",
"0xe9275ac6c2378c0fb93c738ff55d54a80b3e2d8a",
"0x951f8ad40e8a997240850e608221a556eabd2f1f",
"0xa7fb80b759ea191c19720f531398663b298455fd",
"0x4abf36cfe4d3385c4670178ab2a5ea9b5314099b",
"0x147e7d6c5b88b4b6d3f2de67be276f65ba64cd6c",
"0x35bfbea71ceb7dc09371380e30bcc38e7364b119",
"0x0ac12fdf2575f15e7c50a2696578534c0070c86d",
"0xad8af3b0bf1032b981871e5bd66edd29a7de77e4",
"0x6b2c02f29e5cb2622a7e9d66321a8a4156c7e3d4",
"0x09866848e7eec651d6fa2f083bc34a6f2297b5d4",
"0xbfce231a2bcc016b6fb23fdc934ef5530b2a115e",
"0x291a308d175cbcce49036d07eb284e594df6ddc6",
"0x50b0afda91fb3d2814642c5e03ee900d29f9ddda",
"0xe512dd4c09e14c74f973d4d4a35a0062a3e6a6cf",
"0x48598afae978e96bdf4b0fec78b9694b36deabef",
"0x2f6c0a57adf5cf9ab0e6c73bf4fa7b2d33b83e41",
"0xd4b88ecc52ae057ce39246b5735621798ff3551a",
"0xc4e3ee9305e5fec70ec90c5d8ed2be201c7eb917",
"0x6eb44cdfe0b95a7ce031e4ebb54d24618fc455f3",
"0xbbe455158c1087a4f7984150fa96a3208798e0b1",
"0xd22173b52b6ca3b3cab6711f3bd589452c3c5ecc",
"0xb6bf37738ba2ed5e6aab50750d429fe86141e529",
"0x5fd21eba060ba46ad458d6a2b0db5c050f07feb2",
"0x3b63294873689f11a7cd0e03d474031bfa81ab32",
"0x501ee490f74a9ba52d2f2c92c3a4ebb788048f4d",
"0x69f3c8695ccc7c77edaa9459d9dbc9a444cf3c5b",
"0x5a6d407c0ec3f514a176b329e2c8fdf10bd96c4e",
"0x4728df26b305e717f25604fd03799e56e1f8530a",
"0x54a7266645ee8002e7604617affd428071ac1277",
"0x50a76f23a5b5613a606a3d2b7395d2cb7025062e",
"0xd7e53b35a429be82078c39689e5b2a4766054c3d",
"0xa69c682d6e044d5eceddfa0342dd98bb9ff8d309",
"0x3e244e73776e6bb4e9d0b14b8ec562e8d3aed560",
"0xc30cd50a9d469e0b0a1ff96042abac226c464664",
"0x40010ce54eda6f039ca30d102cff283ed8f8b91f",
"0xa5299309e4f6bff12c6d532016044ab0c3a5d0d8",
"0xf6a32f757196ac753a354f145f408bf88beacf29",
"0xf8d2fa00d3e9ca1cd7fc79fd2a3d9fbd7a00091e",
"0x77bb41b3a80982e19daae2cfe94403afcc613489",
"0x54bb529efe28e8dedc66cdf4638a71ff3bd9cffb",
"0x3c2fa8d86b5a1a7d04368c5d8e6212f3ee42962b",
"0x59a6a51d205badc2c5ecc0d33584307babebd6cd",
"0xeb94d605069ec5577fffaa0988772afba38641c1",
"0x76d860295e1add6222c2402163a1fa3d607ef3ed",
"0xe309d682e81d18c3850491716940e13a4c45a25c",
"0x64932f86d69f2717307f41b4c6b8198000583c63",
"0x6829b3be1c0c14b292549e1f2d1224764c1bdd4e",
"0x84f3028236c9ab1b628e0ba7e7daed471f7a05d9",
"0x6f04833195de49ab7021c76f6c756ffa41cad262",
"0xfdf4826bb3284ee31205c2f14cb43d828b488721",
"0x28dcf1266bbaf23d82d5c22543aca776d234020b",
"0xa6c427850d9b1e352c1bb27ed01f3afda6cd8fb2",
"0xf15cd26feba3e97cb4b60f555b79b7e233eb0a05",
"0x6cc01fad64f382b394daba2396868570a6c1b357",
"0xddbe93624c94179ee63b7bcf9548b3b236d35b14",
"0x9161d8a046136c6cecbbd24fe71d12922e8606fe",
"0x3dca14e5ca4c567a3abd07f0c8ce138ccf9aee60",
"0x0c99ce8c2c27839f93658ee82877eb9a7a8c9fbd",
"0x9ad87fbce7924fe94cb2adf6c438c79a27fefc70",
"0x7a88c975b4aff7b2d88be6aca16792e0fab60030",
"0x3b363f3a12310e8037e246a5d7a36930f3662ce5",
"0xf89b06758c6a942b4a8cb98ac4810dcafba6cfe7",
"0x0d3c1f3c822dbdead3f27a62c88a1a57ee27463b",
"0x0764dc400c280ff2b6d1f0582969c0c668271340",
"0xd028980f1704abe5da3beb621d14c264b59692db",
"0xcf91cc9642c45a878234c161f0741d5b5d2eeb34",
"0x10c0be5f67833e7d98bf438fc165d2d97e93f45c",
"0x13056e0898c27eb270a795c2965938a0c64c4e88",
"0x736da6a63d5b6a6928ecd2701329314f2194cfeb",
"0x9d8a72e842bd0c029f7e68d324483b2dd49b53f5",
"0x5219b0b4b28b0ebd1daf624d1046fc8328e107cd",
"0xaccf22c47769cd6cb1db40d3930925bd2ea54c99",
"0xcbb0e8927c6a38b56cf1890865eed56955e27210",
"0x7df0c33b1dcf5bf4639a2b362ceae02d50378a9b",
"0xe7b00b2764f0ab4ddc7ad13bba8d24c132366976",
"0x8ff6375ac4d211cde3b6549a12e0cfcb64c800a1",
"0xfd041f0040fd86bae41500f60784b3c317d2f53f",
"0xf90f4933d08d154ebf51910b29be5abeac539925",
"0xfbea0e5e563860b68348bb5da4013fec2928c58e",
"0xf122fff927d6875d6590ad5b3a48e54c33043b60",
"0xac1793967d290da5fb1ec8b0fc4bf3b54e76322b",
"0x28b425e81d1842aacd645efd5c48be28546f860c",
"0x193cf4314e2f4df19508fcdf8f1f3899c1011ddf",
"0x2c38b952dde6f6836b545bdc00937ae60f849fdc",
"0x710d9266933e755d0af6509e5b4fe264a90bad78",
"0x3630feb27816043873866de2ed5c04f69b49e941",
"0x9a3110f65ef679dcdc8ff5cae2604e1f571ae76d",
"0x3d7fa056685d3c5f12f96fe51d65ca28cf695d58",
"0xa1f861de2fbaf99680f5d86bbfe87e09d1334c63",
"0x989a1fcba9ee13f1142b4008b556663322ec6dfb",
"0xf21277aa4e4197591a3762c974a7df5c1291edfd",
"0x69dbbd8f2fd88d18cbff1feddefb4ba5fd4b6baf",
"0xa5e5fc3ae57970558a91a98f2743c090249c31d6",
"0x46a9a9b667258129dbee7197306effc70caf4393",
"0x5d326f969f883062245bffb116c99b4f530f15b7",
"0x542d63b8fb9a909fa53872df40bcb4971dd6d55c",
"0x4aed2a0caf6074d79675165ae170bd639994cdcd",
"0x86298e91ac4ab1ca3842085aa489bf94e4c46d94",
"0x14a170cc315caaf9d6a7a3e4757b955389860e6b",
"0x310c8c13182a8d8c435ed2c585f74df960a4a972",
"0xf22aae76e2eb8a9f8720c511dd2b545e2674ac7c",
"0x86dfedffe5c52963688ca97dcd561f03211a8ec6",
"0x94920445dd8bc6670d306e309ee9152bc87864da",
"0x3669a3b3ac3970b5978795938ce735ba0a78e451",
"0x7b879cf04f99174585a880414a7cb9717f416f10",
"0x1294617f11acccdd8e1b59d338cf09b5b0eb135d",
"0xf368105d4107a689caaa8edcb2489349180be2d6",
"0x6e5a96720e3a258c475f36e521a812662db7a92f",
"0x53faf39b280ca76a39f547f1edd3a1d3d0a19372",
"0x2ea549bcb57d8bd6bc0b87c9583124fec378036b",
"0x763fe94c549d9508ad3b3f9893e49b4656d26323",
"0x67ef30d9b25a8fc6ad85c4480fc6ab3a90b9d6b4",
"0xbff7c20770d47733d21d14b72407189b32b4fdef",
"0x91f8f33336269cc1a8df4a0bfbd63c8633593b4b",
"0xb8f151ec606981687b9d4ed6e44e91c996689ae1",
"0x1770c692db5f54a642f7f0b96541e92f37fd7454",
"0x2b471621dd25a044cba4014220260b3e821b1b32",
"0x225b0aa33d0d4ff3a5a414d4e3f31d9d373ee005",
"0xf473f49a4f77e50e43e28403b8809007a90d8b35",
"0x2d63700f76d523d5aa0a3c04492ed56ab3e6f371",
"0x1f95b6bdf9a2e501c87bd76ac1d2ffa5e44b163c",
"0x18ecb86aa517da156c3baa51dd3cb7b3538e0725",
"0xa876bbb8353358e83b230bbaa14c539bd9242ae2",
"0x241bc0e1c87adaa4537af2bb98206aafb55118e8",
"0x385fd77f7b5a1e67222c94304d342ff4752ce92c",
"0x0a33b632dfc72f7bfd0a688b6c649d285e22890a",
"0x1191419f525ddb20ae8ca76756933c9680dbdec6",
"0xf2df62915e9cf4439f7311bbcefee57a30b45e61",
"0x2a95c20a1e6f6565c3335cbc6fe4abea1512b9cd",
"0x6b3bacba7a6da1d6660079f5fd49fdc167ec5783",
"0x484adef8f940c01b79f8603685ccaef84c259b01",
"0x148861517d05fa4428715f20e1c86bfc849492a6",
"0x0ca40cd5c9b3a0fdc62616579e35e9c0ec3d1443",
"0xa0f71e6e9fb8f07ebdeffed3eece0eae1e34657f",
"0x46b2031f44961f139179553f24d32f0a24157056",
"0xdee509b3e389791544a55a67c07d23ec9561738a",
"0x4cedfc9444b452701f6811f5f27ab44199495ac3",
"0x75b9c843c381338a2ebf5c2025b90f07efa85069",
"0xe2eb9f7cff8890c2e49ee9b0f9e3bb918f8e95f5",
"0xb3d8d8cdd16b5026fbc5cd6a6770fba607a8d02a",
"0xec9abc57357b5f1475b4a115bd0f8c2cc9b34317",
"0x2fe7cb6a9d4a34e24f0b2d9665c2b8996d66ff96",
"0xd3e906e94150bd2b32fccf092db3b82a65853ee2",
"0x69acb1f5638d8414f282ad7d3e7c5d60ce739ac3",
"0x323e7cf399df32139c5cc3ba08220258ff98373c",
"0x753a49544f5572a3a14e307a8cdef35578fb3343",
"0x26d33b1855eddd69d5483fc66255a83b40786cb7",
"0xcb92828352227755009d444f606a339d0937bf95",
"0x0a34ec7e4e2691d0a403acd885366699ee9fe901",
"0x612d2ccf0988e86e884f22182ee6f7bb18c7075e",
"0xf6056610a26e6bd3700f56f728ce0f03165ef9aa",
"0x0d56703b14f9f13d7502ffb44744c1dc8f288768",
"0x1284db86f59e554f73edf302a6f3c06e2f6f922f",
"0x9d9de0f6410a89c5334d5221b4f2104ac87f16c0",
"0x2e3922be905a3314fe5e16b44a3e878bae69c150",
"0xf489e2eebe635a91564a1b05d66571b631907f0e",
"0xe86b60b9e3326d5817a0e41e7c215e61011f4179",
"0xab7dde540d93219906cc431cca83723611312823",
"0xab3e1a89657504fc68bc60ec36a80cbac20d2eda",
"0x57367a753010925ac7b4f16b1d1ff54dc281198d",
"0x23e7b7a73c4ccdeae2e9faeb852faa0c14a6c9cb",
"0x06793850a8c0ff839776b23c7ab639461dcf3afd",
"0xbdf1e8d8a8056f3bfd598cdb4b600e83d040266c",
"0x06128f4ac33a84a3b35a00e6bd29eab684adca08",
"0xab417a569dda92b23f3b05f12b9d79dbe479e83c",
"0x6f5e079023a8b5766d50f6f97b652b854c6c2fc7",
"0x8e45025de90611840814b4dedfa0cbfdb004d6ab",
"0x6f9929d3a9fd29fc1c03054075e873b9f8c925a8",
"0x23e7b7a73c4ccdeae2e9faeb852faa0c14a6c9cb",
"0x4c666fdd32bf76a84a78917b000a54be413721c1",
"0xbe4be1c532250eed6a32da2d819aa3caa83514db",
"0x96d15cd6e7ab673551002d9efe74ca497a1ba814",
"0xc53da52ac6e43f3da8d823185ec5a2a10d1f21c1",
"0xacd2be32c650738357cdc10d42c9da37b6a938fc",
"0x7730d6b8530622c0ec9f8d56b58ce0ff6e69e6cb",
"0xf9d1bee885f33ee99bc47ba2a24b00df85f8fba6",
"0x09a871929a46cb5c16def69c881143535d3b05b6",
"0x4bbf6699dab9a51786d3e0cbdf6c7a61034e49ea",
"0x76127d3670e070182739d28c289f7071077aa3ad",
"0xc678c1edbf9648b0ebf887958476b53dc0c1c0ac",
"0xe4759127beaa44f66e8cd4190318e77f400553a6",   
"0x9133f68392a8dc204fa8dd2e023642d769a24096",
"0x8e45025de90611840814b4dedfa0cbfdb004d6ab",
"0x1b98b66af69c9ffa457db20097c6c71c6e5a0447",
"0x5199325e053f8fb189110ec6d8c9592724040a09",
"0x76eb8e94e4edfb8afa3b144b327bb2c960dd45e4",
"0x5199325e053f8fb189110ec6d8c9592724040a09",
"0x76eb8e94e4edfb8afa3b144b327bb2c960dd45e4",
"0xa861aafae01b520357d1ce1bbc98743497a8ec62",
"0xe2e29e3b13dfdd0118e9e86ae6ead5d33b9bbfef",
"0xe2e29e3b13dfdd0118e9e86ae6ead5d33b9bbfef",
"0xc94662a681d62357c72d29d3bb14f8a0713fef5c",
"0x9519503cf8ba0a2a1574651be5f4d5c2cc215fba",
"0x348feaae84bc732795459c4776af565d1330ed8d",
"0xc9279c5d7fc4af3c45eef879e9619c5a39eea307"]
