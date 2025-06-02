"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LuArrowLeft,
  LuCopy,
  LuRefreshCw,
  LuCheck,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

export default function PasswordGeneratorPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(14);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  // Character sets
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  // Generate password function
  const generatePassword = () => {
    let charset = "";
    let password = "";

    // Build character set based on selected options
    if (options.uppercase) charset += charSets.uppercase;
    if (options.lowercase) charset += charSets.lowercase;
    if (options.numbers) charset += charSets.numbers;
    if (options.symbols) charset += charSets.symbols;

    // If no options selected, default to lowercase
    if (charset === "") charset = charSets.lowercase;

    // Ensure at least one character from each selected type
    if (options.uppercase)
      password +=
        charSets.uppercase[
          Math.floor(Math.random() * charSets.uppercase.length)
        ];
    if (options.lowercase)
      password +=
        charSets.lowercase[
          Math.floor(Math.random() * charSets.lowercase.length)
        ];
    if (options.numbers)
      password +=
        charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)];
    if (options.symbols)
      password +=
        charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)];

    // Fill the rest of the password length
    for (let i = password.length; i < passwordLength; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password to avoid predictable patterns
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setGeneratedPassword(password);
  };

  // Calculate password strength
  const calculateStrength = () => {
    let score = 0;
    let feedback = "";

    if (passwordLength >= 8) score += 1;
    if (passwordLength >= 12) score += 1;
    if (passwordLength >= 16) score += 1;

    if (options.uppercase) score += 1;
    if (options.lowercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 1;

    if (score <= 2) {
      feedback = "Weak";
      return { strength: feedback, color: "bg-red-500", width: "25%" };
    } else if (score <= 4) {
      feedback = "Fair";
      return { strength: feedback, color: "bg-yellow-500", width: "50%" };
    } else if (score <= 6) {
      feedback = "Good";
      return { strength: feedback, color: "bg-blue-500", width: "75%" };
    } else {
      feedback = "Strong";
      return { strength: feedback, color: "bg-green-500", width: "100%" };
    }
  };

  const passwordStrength = calculateStrength();

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  // Handle option changes
  const handleOptionChange = (option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  // Generate initial password on component mount
  useEffect(() => {
    generatePassword();
  }, [passwordLength, options]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-2"
              onClick={() => router.push("/")}
            >
              <LuArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Password Generator
              </h1>
              <p className="text-sm text-gray-600">
                Generate secure passwords with custom options
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generated Password Display */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-red-500 text-white rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Your Generated Password
            </CardTitle>
            <CardDescription>
              Click the copy button to save your password to clipboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Password Display */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={generatedPassword}
                  readOnly
                  className="font-mono text-lg pr-20 bg-gray-50 border-2 border-dashed"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-8 w-8"
                  >
                    {showPassword ? (
                      <LuEyeOff className="h-4 w-4" />
                    ) : (
                      <LuEye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <LuCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <LuCopy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Strength */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Password Strength
                  </span>
                  <Badge
                    variant="secondary"
                    className={`${
                      passwordStrength.strength === "Strong"
                        ? "bg-green-100 text-green-800"
                        : passwordStrength.strength === "Good"
                        ? "bg-blue-100 text-blue-800"
                        : passwordStrength.strength === "Fair"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {passwordStrength.strength}
                  </Badge>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  className="flex-1 flex items-center gap-2"
                  onClick={copyToClipboard}
                >
                  <LuCopy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Password"}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={generatePassword}
                >
                  <LuRefreshCw className="h-4 w-4" />
                  Generate New
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Password Options</CardTitle>
            <CardDescription>
              Customize your password settings below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Length */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Password Length
                </label>
                <Badge variant="outline" className="text-sm">
                  {passwordLength} characters
                </Badge>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="4"
                  max="32"
                  value={passwordLength}
                  onChange={(e) =>
                    setPasswordLength(Number.parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4</span>
                  <span>16</span>
                  <span>32</span>
                </div>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">
                Include Characters
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Uppercase Letters */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    options.uppercase
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleOptionChange("uppercase")}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={options.uppercase}
                      onChange={() => handleOptionChange("uppercase")}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Uppercase Letters
                    </div>
                    <div className="text-xs text-gray-500">A, B, C, D...</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    A-Z
                  </Badge>
                </div>

                {/* Lowercase Letters */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    options.lowercase
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleOptionChange("lowercase")}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={options.lowercase}
                      onChange={() => handleOptionChange("lowercase")}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Lowercase Letters
                    </div>
                    <div className="text-xs text-gray-500">a, b, c, d...</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    a-z
                  </Badge>
                </div>

                {/* Numbers */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    options.numbers
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleOptionChange("numbers")}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={options.numbers}
                      onChange={() => handleOptionChange("numbers")}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Numbers
                    </div>
                    <div className="text-xs text-gray-500">1, 2, 3, 4...</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    0-9
                  </Badge>
                </div>

                {/* Symbols */}
                <div
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    options.symbols
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => handleOptionChange("symbols")}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={options.symbols}
                      onChange={() => handleOptionChange("symbols")}
                      className="h-4 w-4 text-green-600 rounded border-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Symbols
                    </div>
                    <div className="text-xs text-gray-500">!, @, #, $...</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    !@#
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Password Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1 bg-blue-500 text-white rounded">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Password Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use at least 12 characters for better security</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Include a mix of uppercase, lowercase, numbers, and symbols
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Don't use personal information or common words</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Use a unique password for each account</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
