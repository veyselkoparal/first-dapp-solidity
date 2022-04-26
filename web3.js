  const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "rinkeby"
  );

  const MoodContractAddress = "0xa33C4f42f10988661ba6816fEEbC30C78fE60bF5";
  const MoodContractABI = [
  {
    "inputs": [
        {
            "internalType": "string",
            "name": "_mood",
            "type": "string"
        }
      ],
      "name": "setMood",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getMood",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];

  let MoodContract;
  let signer;

  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then(function (accounts) {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });

  async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    console.log(Mood);
    document.getElementById("mood").value = "";
    document.getElementById("mood").value = Mood;
  }

  async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
  }