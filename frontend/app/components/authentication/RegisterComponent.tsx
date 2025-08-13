import React, { useMemo } from 'react';
import { FacebookLogin, GoogleLogin } from './SocialLogin';

interface RegisterComponentProps {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	error: string | null;
	loading?: boolean;
	setUsername: (v: string) => void;
	setEmail: (v: string) => void;
	setPassword: (v: string) => void;
	setConfirmPassword: (v: string) => void;
	submit: (e: React.FormEvent) => void;
}

// Lightweight password strength scoring
function scorePassword(pw: string) {
	let score = 0;
	if (!pw) return { score, label: 'Too Short', color: 'bg-red-400', textColor: 'text-red-600' };
	const length = pw.length;
	if (length >= 8) score += 1; // base length
	if (length >= 12) score += 1; // longer length bonus
	if (/[a-z]/.test(pw)) score += 1;
	if (/[A-Z]/.test(pw)) score += 1;
	if (/[0-9]/.test(pw)) score += 1;
	if (/[^A-Za-z0-9]/.test(pw)) score += 1;
	// Cap score at 6 => map to 0-5 scale visually
	if (score > 6) score = 6;
	const labels = [
		'Too Short',
		'Weak',
		'Fair',
		'Good',
		'Strong',
		'Very Strong',
		'Excellent'
	];
	const colors = [
		'bg-red-400',
		'bg-red-400',
		'bg-orange-400',
		'bg-yellow-400',
		'bg-green-400',
		'bg-emerald-500',
		'bg-teal-500'
	];
	const textColors = [
		'text-red-600',
		'text-red-600',
		'text-orange-500',
		'text-yellow-600',
		'text-green-600',
		'text-emerald-600',
		'text-teal-600'
	];
	return { score, label: labels[score], color: colors[score], textColor: textColors[score] };
}

export const RegisterComponent: React.FC<RegisterComponentProps> = ({
	username,
	email,
	password,
	confirmPassword,
	error,
	loading,
	setUsername,
	setEmail,
	setPassword,
	setConfirmPassword,
	submit,
}) => {
	const strength = useMemo(() => scorePassword(password), [password]);
	const percent = ((strength.score) / 6) * 100; // 0..100

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
			<div className="flex w-2/3 max-w-5xl h-[90vh] rounded-xl shadow-lg bg-white overflow-hidden">
				{/* Left Side */}
				<div className="basis-1/2 flex items-center justify-center">
					<div className="relative w-full h-full">
						<img
							src="/images/login-image.png"
							alt="Background"
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black/50" />
						<div className="relative flex flex-col h-full w-full text-white p-8">
							<h1 className="text-3xl font-bold tracking-wide">Modella</h1>
							<div className="mt-auto mb-8">
								<h2 className="text-2xl font-semibold">Create Your Account</h2>
								<p className="text-lg text-gray-200 mt-2">
									Plan outfits, organize your wardrobe, and discover smarter style.
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* Right Side */}
				<div className="basis-1/2 flex flex-col space-y-4 items-center justify-center px-16 overflow-y-auto py-8">
					<div className='flex flex-col items-center mb-2'>
						<h1 className='text-2xl font-bold'>Register</h1>
						<p className='text-center text-gray-400 text-sm'>Sign up to start curating your digital wardrobe.</p>
						{error && <p className="text-sm text-red-600 mt-2">{error}</p>}
					</div>
					<form onSubmit={submit} className="w-full space-y-4" aria-describedby="password-strength-text">
						<input
							className="w-full border rounded px-3 py-2"
							placeholder="Username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							autoComplete="username"
							required
						/>
						<input
							type="email"
							className="w-full border rounded px-3 py-2"
							placeholder="Email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							autoComplete="email"
							required
						/>
						<input
							type="password"
							className="w-full border rounded px-3 py-2"
							placeholder="Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							autoComplete="new-password"
							required
							minLength={6}
						/>
						{/* Strength Meter */}
						<div className="space-y-1">
							<div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
								<div
									className={`h-full transition-all duration-300 ${strength.color}`}
									style={{ width: `${percent}%` }}
								/>
							</div>
							<p id="password-strength-text" className={`text-xs font-medium ${strength.textColor}`} aria-live="polite">
								Password Strength: {strength.label}
								{strength.score < 3 && password.length > 0 && (
									<span className="ml-1 text-gray-500">Consider adding uppercase, numbers & symbols.</span>
								)}
							</p>
						</div>
						<input
							type="password"
							className="w-full border rounded px-3 py-2"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							autoComplete="new-password"
							required
							minLength={6}
						/>
						<button
							disabled={loading}
							className="w-full bg-gray-700 text-white py-2 rounded hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{loading ? 'Creating account...' : 'Sign Up'}
						</button>
					</form>
					<div className='flex items-center justify-center w-full my-2'>
						<hr className="w-full my-4" /> <span className='mx-2 uppercase text-gray-400 font-bold text-[10px]'>Or</span> <hr className="w-full my-4" />
					</div>
					<p className='text-gray-400 text-sm'>Register with social accounts</p>
					<div className="flex gap-2">
						<FacebookLogin />
						<GoogleLogin />
					</div>
				</div>
			</div>
		</div>
	);
};
