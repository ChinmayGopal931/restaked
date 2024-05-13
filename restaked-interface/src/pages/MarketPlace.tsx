import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import FAQ from "@/components/ui/Portfolio/FAQ";

export default function AVS() {
  const operatorData = {
    _id: "662a4741555e76cd06498a60",
    operatorName: "P2P.org [all AVS]",
    operatorAddress: "0xDbEd88D83176316fc46797B43aDeE927Dc2ff2F5",
    operatorWebsite: "https://p2p.org/",
    operatorTwitter: "https://x.com/P2Pvalidator",
    operatorLogo:
      "https://raw.githubusercontent.com/p2p-org/eigenlayer-operator/main/logo.png",
    operatorDescription:
      "Forget FOMO with P2P.org. Delegate and be sure we onboard all possible AVS and share any airdrops with delegators.  Each AVS will be thoroughly evaluated before slashing is enabled, projected for Q3. P2P.org is a global leader with $7.5 billion and over 90,000 delegators across 40+ networks.",
    uniqueStrategies: [
      "0x57ba429517c3473B6d34CA9aCd56c0e735b94c02",
      "0x9d7eD45EE2E8FC5482fa2428f15C971e6369011d",
      "0xa4C637e0F704745D182e4D38cAb7E7485321d059",
      "0x13760F50a9d7377e4F20CB8CF9e4c26586c658ff",
      "0x298aFB19A105D59E74658C4C334Ff360BadE6dd2",
      "0x93c4b944D05dfe6df7645A86cd2206016c51564D",
      "0x0Fe4F44beE93503346A3Ac9EE5A26b130a5796d6",
      "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2",
      "0x8CA7A5d6f3acd3A7A8bC468a8CD0FB14B6BD28b6",
      "0x54945180dB7943c0ed0FEE7EdaB2Bd24620256bc",
      "0xAe60d8180437b5C34bB956822ac2710972584473",
      "0x7CA911E83dabf90C90dD3De5411a10F1A6112184",
      "0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0",
    ],
    uniqueStakers: 2366,
    totalTVL: 299953.7192163064,
    avsOptIns: [
      "0x870679E138bCdf293b7Ff14dD44b70FC97e12fc0",
      "0xed2f4d90b073128ae6769a9A8D51547B1Df766C8",
      "0xD25c2c5802198CB8541987b73A8db4c9BCaE5cC7",
      "0x9FC952BdCbB7Daca7d420fA55b942405B073A89d",
      "0x71a77037870169d47aad6c2C9360861A4C0df2bF",
      "0x6026b61bDD2252160691CB3F6005B6B72E0Ec044",
      "0x35F4f28A8d3Ff20EEd10e087e8F96Ea2641E6AA2",
      "0x23221c5bB90C7c57ecc1E75513e2E4257673F0ef",
      "0xE5445838C475A2980e6a88054ff1514230b83aEb",
    ],
    __v: 0,
    createdAt: "2024-04-25T12:06:25.782Z",
    updatedAt: "2024-04-26T17:51:39.195Z",
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="bg-gray-900 text-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-between px-[20%] py-12">
        <img
          src={operatorData.operatorLogo}
          alt="Operator Logo"
          className="w-64 h-64 rounded-full shadow-lg"
        />
        <div className="mt-4 md:mt-0 md:ml-4">
          <p className="text-4xl font-bold">{operatorData.operatorName}</p>
          <p className="mt-2 text-lg text-gray-300">
            {operatorData.operatorDescription}
          </p>
        </div>
      </div>

      <div className="px-[20%] py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <Card className="shadow-xl rounded-lg p-4 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {formatter.format(operatorData.totalTVL * 3100)}
              </CardTitle>
              <CardDescription className="text-xl font-semibold">
                Total TVL
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-xl rounded-lg p-4 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {operatorData.uniqueStakers}
              </CardTitle>
              <CardDescription className="text-xl font-semibold">
                Total Stakers Delegated
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mt-12">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  );
}
