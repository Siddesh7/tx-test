import {Button, Frog, TextInput, parseEther} from "frog";
// import { neynar } from 'frog/hubs'
import {handle} from "frog/vercel";
import {abi} from "./abi.js";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/", (c) => {
  return c.res({
    action: "/finish",
    image: (
      <div
        style={{
          color: "white",
          display: "flex",
          fontSize: 60,
          backgroundColor: "black",
        }}
      >
        Perform a transaction
      </div>
    ),
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target="/send-matic">
        Send Polygon
      </Button.Transaction>,
      <Button.Transaction target="/send-ether">Send ETH</Button.Transaction>,
    ],
  });
});

app.frame("/finish", (c) => {
  const {transactionId} = c;
  return c.res({
    image: (
      <div
        style={{
          color: "white",
          display: "flex",
          fontSize: 60,
          backgroundColor: "black",
        }}
      >
        Transaction ID: {transactionId}
      </div>
    ),
  });
});

app.transaction("/send-matic", (c) => {
  const {inputText} = c;
  // Send transaction response.
  return c.send({
    chainId: "eip155:137" as any,
    to: "0x1A3cDE21e27CA9a2670C2c647550D39a72d9637C",
    value: parseEther(inputText!),
  });
});
app.transaction("/send-ether", (c) => {
  const {inputText} = c;
  // Send transaction response.
  return c.send({
    chainId: "eip155:8453",
    to: "0x1A3cDE21e27CA9a2670C2c647550D39a72d9637C",
    value: parseEther(inputText!),
  });
});

// app.transaction("/mint", (c) => {
//   const {inputText} = c;
//   // Contract transaction response.
//   return c.contract({
//     abi,
//     chainId: "eip155:10",
//     functionName: "mint",
//     args: [69420n],
//     to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
//     value: parseEther(inputText!),
//   });
// });

export const GET = handle(app);
export const POST = handle(app);
