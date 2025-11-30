"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface BookingWizardProps {
    onComplete: (data: BookingData) => void;
    onCancel?: () => void;
}

export interface BookingData {
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    dogs: boolean;
    name: string;
    email: string;
    phone: string;
    message: string;
    gdprConsent: boolean;
}

export function BookingWizard({ onComplete, onCancel }: BookingWizardProps) {
    const t = useTranslations("BookingWizard");
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<BookingData>>({
        adults: 2,
        children: 0,
        dogs: false,
        gdprConsent: false,
    });

    const totalSteps = 3;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceedToStep2 = formData.checkIn && formData.checkOut && formData.adults;
    const canProceedToStep3 = canProceedToStep2 && formData.name && formData.email;

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className="flex items-center flex-1"
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all",
                                    currentStep >= step
                                        ? "bg-luxury-navy-900 dark:bg-luxury-sand-500 text-white dark:text-luxury-navy-900"
                                        : "bg-luxury-navy-100 dark:bg-luxury-navy-800 text-luxury-navy-400 dark:text-slate-600"
                                )}
                            >
                                {currentStep > step ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    step
                                )}
                            </div>
                            {step < 3 && (
                                <div
                                    className={cn(
                                        "flex-1 h-1 mx-2 rounded transition-all",
                                        currentStep > step
                                            ? "bg-luxury-navy-900 dark:bg-luxury-sand-500"
                                            : "bg-luxury-navy-100 dark:bg-luxury-navy-800"
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-sm">
                    <span className={currentStep >= 1 ? "font-medium" : "text-luxury-navy-400 dark:text-slate-600"}>
                        {t("steps.periodAndGuests")}
                    </span>
                    <span className={currentStep >= 2 ? "font-medium" : "text-luxury-navy-400 dark:text-slate-600"}>
                        {t("steps.contactInfo")}
                    </span>
                    <span className={currentStep >= 3 ? "font-medium" : "text-luxury-navy-400 dark:text-slate-600"}>
                        {t("steps.summary")}
                    </span>
                </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentStep === 1 && (
                        <Step1
                            formData={formData}
                            setFormData={setFormData}
                            onNext={nextStep}
                            t={t}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2
                            formData={formData}
                            setFormData={setFormData}
                            onNext={nextStep}
                            onBack={prevStep}
                            t={t}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3
                            formData={formData}
                            setFormData={setFormData}
                            onBack={prevStep}
                            onComplete={() => onComplete(formData as BookingData)}
                            t={t}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <Button
                    variant="ghost"
                    onClick={currentStep === 1 ? onCancel : prevStep}
                    className="min-w-32"
                >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    {currentStep === 1 ? t("buttons.cancel") : t("buttons.back")}
                </Button>

                {currentStep < 3 ? (
                    <Button
                        onClick={nextStep}
                        disabled={
                            (currentStep === 1 && !canProceedToStep2) ||
                            (currentStep === 2 && !canProceedToStep3)
                        }
                        className="min-w-32"
                    >
                        {t("buttons.next")}
                        <ChevronRight className="h-5 w-5 ml-1" />
                    </Button>
                ) : (
                    <Button
                        onClick={() => onComplete(formData as BookingData)}
                        disabled={!formData.gdprConsent}
                        className="min-w-32"
                    >
                        {t("buttons.sendRequest")}
                    </Button>
                )}
            </div>
        </div>
    );
}

// Step Components will be defined in separate files for better organization
function Step1({ formData, setFormData, onNext, t }: any) {
    return (
        <div className="bg-white dark:bg-luxury-navy-900 p-6 rounded-lg border border-luxury-navy-200 dark:border-luxury-navy-800">
            <h2 className="text-2xl font-serif font-bold mb-6">{t("step1.title")}</h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step1.description")}
            </p>
        </div>
    );
}

function Step2({ formData, setFormData, onNext, onBack, t }: any) {
    return (
        <div className="bg-white dark:bg-luxury-navy-900 p-6 rounded-lg border border-luxury-navy-200 dark:border-luxury-navy-800">
            <h2 className="text-2xl font-serif font-bold mb-6">{t("step2.title")}</h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step2.description")}
            </p>
        </div>
    );
}

function Step3({ formData, setFormData, onBack, onComplete, t }: any) {
    return (
        <div className="bg-white dark:bg-luxury-navy-900 p-6 rounded-lg border border-luxury-navy-200 dark:border-luxury-navy-800">
            <h2 className="text-2xl font-serif font-bold mb-6">{t("step3.title")}</h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step3.description")}
            </p>
        </div>
    );
}
