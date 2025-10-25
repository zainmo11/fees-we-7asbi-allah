import React, { useState, useMemo, useEffect } from 'react';
import { Platform, Step } from './types';
import { MostaqlIcon, UpworkIcon, PaypalIcon, AirtmIcon, EGPIcon, ArrowRightIcon, ArrowDownIcon } from './components/icons';

const platformDetails = {
  mostaql: {
    name: 'Mostaql (مستقل)',
    logo: <MostaqlIcon />,
    description: '15% platform fee.',
  },
  upwork: {
    name: 'Upwork',
    logo: <UpworkIcon />,
    description: '10-15% platform fee.',
  },
};

// --- Helper Components (defined outside main component) ---

interface PlatformCardProps {
  platform: Platform;
  onSelect: (platform: Platform) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onSelect }) => {
  const details = platformDetails[platform];
  return (
    <div
      onClick={() => onSelect(platform)}
      className="bg-slate-800 rounded-2xl p-6 md:p-8 w-full max-w-sm cursor-pointer border-2 border-slate-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center shadow-lg hover:shadow-green-500/20"
    >
      <div className="mb-4">{details.logo}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{details.name}</h3>
      <p className="text-slate-400">{details.description}</p>
    </div>
  );
};

interface StepNodeProps {
  step: Step;
  isFirst: boolean;
}

const StepNode: React.FC<StepNodeProps> = ({ step, isFirst }) => {
    const amountColor = step.isFinalEGP ? 'text-green-400' : step.isFinalUSD ? 'text-amber-400' : 'text-slate-200';
    const amountSize = step.isFinalEGP ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';

    return (
        <div className="flex-shrink-0 flex flex-col items-center text-center p-4 bg-slate-800/50 rounded-xl w-48 min-h-[180px] justify-center border border-slate-700">
            <div className={`transition-transform duration-500 ${isFirst ? 'scale-110' : ''}`}>
                {step.icon}
            </div>
            <p className="text-sm font-semibold text-slate-300 mt-2">{step.label}</p>
            <p className={`${amountSize} ${amountColor} font-bold mt-1`}>
                {step.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
                <span className="text-xs ml-1 text-slate-400">{step.isFinalEGP ? 'EGP' : 'USD'}</span>
            </p>
            {step.notes && <p className="text-xs text-slate-500 mt-1">{step.notes}</p>}
        </div>
    );
};

interface CalculatorProps {
  platform: Platform;
  onReset: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ platform, onReset }) => {
  const [initialAmount, setInitialAmount] = useState('1000');
  const [p2pRate, setP2pRate] = useState('50');
  const [isUpworkOverrideEnabled, setIsUpworkOverrideEnabled] = useState(false);
  const [upworkOverrideAmount, setUpworkOverrideAmount] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [upworkFee, setUpworkFee] = useState(0.10);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);


  const calculatedSteps = useMemo<Step[]>(() => {
    const initial = parseFloat(initialAmount) || 0;
    const p2p = parseFloat(p2pRate) || 0;
    const steps: Step[] = [];

    if (initial <= 0) return [];
    
    steps.push({ label: 'Job Amount', amount: initial, icon: platformDetails[platform].logo });

    if (platform === 'mostaql') {
      const afterMostaql = initial * (1 - 0.15);
      steps.push({ label: 'After Mostaql', amount: afterMostaql, icon: <PaypalIcon />, notes: '15% fee' });
      const afterPaypal = afterMostaql * (1 - 0.03);
      steps.push({ label: 'After PayPal', amount: afterPaypal, icon: <AirtmIcon />, notes: '3% fee' });
      const afterAirtmIn = afterPaypal * (1 - 0.0175);
      steps.push({ label: 'After Airtm In', amount: afterAirtmIn, icon: <AirtmIcon />, notes: '1.75% fee' });
      const finalUSD = afterAirtmIn * (1 - 0.007);
      steps.push({ label: 'Final USDC (At Binance)', amount: finalUSD, icon: <EGPIcon />, notes: '0.7% fee', isFinalUSD: true });
      const finalEGP = finalUSD * p2p;
      steps.push({ label: 'Final EGP', amount: finalEGP, icon: <EGPIcon />, isFinalEGP: true });
    } else if (platform === 'upwork') {
      const overrideAmount = parseFloat(upworkOverrideAmount) || 0;
      const afterUpwork = isUpworkOverrideEnabled && overrideAmount > 0 ? overrideAmount : initial * (1 - upworkFee);
      steps.push({ label: 'After Upwork', amount: afterUpwork, icon: <PaypalIcon />, notes: isUpworkOverrideEnabled ? 'Manual amount' : `${upworkFee * 100}% fee` });
      const afterPaypal = afterUpwork - 2;
      steps.push({ label: 'After PayPal', amount: afterPaypal, icon: <AirtmIcon />, notes: '$2 fee' });
      const afterAirtmIn = afterPaypal * (1 - 0.0175);
      steps.push({ label: 'After Airtm In', amount: afterAirtmIn, icon: <AirtmIcon />, notes: '1.75% fee' });
      const finalUSD = afterAirtmIn * (1 - 0.007);
      steps.push({ label: 'Final USDC (At Binance)', amount: finalUSD, icon: <EGPIcon />, notes: '0.7% fee', isFinalUSD: true });
      const finalEGP = finalUSD * p2p;
      steps.push({ label: 'Final EGP', amount: finalEGP, icon: <EGPIcon />, isFinalEGP: true });
    }

    return steps;
  }, [initialAmount, p2pRate, platform, isUpworkOverrideEnabled, upworkOverrideAmount, upworkFee]);

  const details = platformDetails[platform];
  
  const baseTransition = 'transition-all duration-700 ease-in-out';
  const mountTransform = isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95';

  return (
    <div className="p-4 md:p-8 min-h-screen flex flex-col items-center relative pb-24">
       <button onClick={onReset} className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors z-10">&larr; Back</button>
      
      <div className={`${baseTransition} ${mountTransform} flex flex-col items-center text-center`}>
        <div className="w-20 h-20">{details.logo}</div>
        <h2 className="text-3xl font-bold mt-2 text-white">{details.name} Calculator</h2>
      </div>

      <div className={`w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 ${baseTransition} ${mountTransform} [transition-delay:200ms]`}>
        <div className="bg-slate-800 p-4 rounded-lg">
          <label htmlFor="initial-amount" className="block text-sm font-medium text-slate-300">Initial Job Amount (USD)</label>
          <input
            type="number"
            id="initial-amount"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 1000"
          />
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <label htmlFor="p2p-rate" className="block text-sm font-medium text-slate-300">P2P Rate (USD to EGP)</label>
          <input
            type="number"
            id="p2p-rate"
            value={p2pRate}
            onChange={(e) => setP2pRate(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 50"
          />
        </div>

        {platform === 'upwork' && !isUpworkOverrideEnabled && (
          <div className="md:col-span-2 bg-slate-800 p-4 rounded-lg">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Upwork Fee</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 text-white cursor-pointer p-2 rounded-md hover:bg-slate-700 transition-colors">
                <input
                  type="radio"
                  name="upwork-fee"
                  value={0.10}
                  checked={upworkFee === 0.10}
                  onChange={() => setUpworkFee(0.10)}
                  className="h-4 w-4 text-green-500 bg-slate-600 border-slate-500 focus:ring-green-500 focus:ring-offset-slate-800"
                />
                <span>10%</span>
              </label>
              <label className="flex items-center space-x-2 text-white cursor-pointer p-2 rounded-md hover:bg-slate-700 transition-colors">
                <input
                  type="radio"
                  name="upwork-fee"
                  value={0.15}
                  checked={upworkFee === 0.15}
                  onChange={() => setUpworkFee(0.15)}
                  className="h-4 w-4 text-green-500 bg-slate-600 border-slate-500 focus:ring-green-500 focus:ring-offset-slate-800"
                />
                <span>15%</span>
              </label>
            </div>
          </div>
        )}
        
        {platform === 'upwork' && (
          <div className="md:col-span-2 bg-slate-800 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="upwork-override-check"
                checked={isUpworkOverrideEnabled}
                onChange={(e) => setIsUpworkOverrideEnabled(e.target.checked)}
                className="h-5 w-5 rounded text-green-500 bg-slate-600 border-slate-500 focus:ring-green-500 focus:ring-offset-slate-800"
              />
              <label htmlFor="upwork-override-check" className="text-sm font-medium text-slate-300 flex-grow">
                Enter amount after Upwork fees directly
              </label>
            </div>
            {isUpworkOverrideEnabled && (
               <input
                type="number"
                id="upwork-override-amount"
                value={upworkOverrideAmount}
                onChange={(e) => setUpworkOverrideAmount(e.target.value)}
                className="block w-full sm:w-64 bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 900"
              />
            )}
          </div>
        )}
      </div>

      {calculatedSteps.length > 0 && (
         <div className={`mt-12 w-full flex justify-center ${baseTransition} ${mountTransform} [transition-delay:400ms]`}>
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-center gap-4 md:gap-x-2 md:gap-y-8 pb-4">
                {calculatedSteps.map((step, index) => (
                    <React.Fragment key={index}>
                        <StepNode step={step} isFirst={index===0}/>
                        {index < calculatedSteps.length - 1 && (
                            <div className="text-slate-500 flex-shrink-0">
                                <ArrowDownIcon className="block md:hidden h-8 w-8" />
                                <ArrowRightIcon className="hidden md:block" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};


// --- Main App Component ---

export default function App() {
  const [platform, setPlatform] = useState<Platform | null>(null);

  if (!platform) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Freelancer Fee <span className="text-green-400">Calculator</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Choose your freelancing platform to see a detailed breakdown of fees and your final take-home pay.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <PlatformCard platform="mostaql" onSelect={setPlatform} />
          <PlatformCard platform="upwork" onSelect={setPlatform} />
        </div>
         <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-xs text-slate-500">
            This is calculated based on the date 25/10/2025
        </footer>
      </div>
    );
  }

  return (
    <>
      <Calculator platform={platform} onReset={() => setPlatform(null)} />
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-xs text-slate-500 bg-slate-900">
          This is calculated based on the date 25/10/2025
      </footer>
    </>
  );
}
