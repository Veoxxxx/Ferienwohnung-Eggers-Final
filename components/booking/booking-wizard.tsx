"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Calendar, User, ClipboardCheck, PartyPopper } from "lucide-react";
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

// Step-Konfiguration mit Icons für visuelles Feedback
const STEPS = [
    { id: 1, icon: Calendar, labelKey: "steps.dates" },
    { id: 2, icon: User, labelKey: "steps.guestData" },
    { id: 3, icon: ClipboardCheck, labelKey: "steps.summary" },
    { id: 4, icon: PartyPopper, labelKey: "steps.confirmation" },
] as const;

export function BookingWizard({ onComplete, onCancel }: BookingWizardProps) {
    const t = useTranslations("BookingWizard");
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<BookingData>>({
        adults: 2,
        children: 0,
        dogs: false,
        gdprConsent: false,
    });

    const totalSteps = 4;

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
            {/* Verbesserter Stepper mit Gold-Akzent */}
            <nav aria-label="Buchungsfortschritt" className="mb-10">
                <ol className="flex items-center justify-between">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <li key={step.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center">
                                    {/* Step Circle mit Animation */}
                                    <motion.div
                                        className={cn(
                                            "flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-colors duration-300 border-2",
                                            isCompleted
                                                ? "bg-luxury-gold-500 border-luxury-gold-500 text-white"
                                                : isActive
                                                    ? "border-luxury-gold-500 text-luxury-gold-600 dark:text-luxury-gold-400 bg-luxury-gold-50 dark:bg-luxury-gold-900/20"
                                                    : "border-luxury-navy-200 dark:border-luxury-navy-700 text-muted-foreground bg-transparent"
                                        )}
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1.1 : 1,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        {isCompleted ? (
                                            <Check className="h-5 w-5" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                    </motion.div>

                                    {/* Step Label */}
                                    <span
                                        className={cn(
                                            "mt-2 text-xs font-medium text-center max-w-[80px] transition-colors duration-300",
                                            isActive
                                                ? "text-luxury-gold-600 dark:text-luxury-gold-400 font-bold"
                                                : isCompleted
                                                    ? "text-luxury-navy-900 dark:text-luxury-sand-100"
                                                    : "text-muted-foreground"
                                        )}
                                    >
                                        {t(step.labelKey)}
                                    </span>
                                </div>

                                {/* Connecting Line mit animiertem Fortschritt */}
                                {index < STEPS.length - 1 && (
                                    <div className="flex-1 mx-2 h-0.5 relative">
                                        <div className="absolute inset-0 bg-luxury-navy-100 dark:bg-luxury-navy-800 rounded" />
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-luxury-gold-500 rounded"
                                            initial={{ width: "0%" }}
                                            animate={{
                                                width: isCompleted ? "100%" : "0%",
                                            }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* Step Content mit weichen Übergängen */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1], // Custom easing für "luxuriöses" Gefühl
                    }}
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
                    {currentStep === 4 && (
                        <Step4 t={t} />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                {currentStep < 4 ? (
                    <>
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
                                onClick={() => {
                                    onComplete(formData as BookingData);
                                    setCurrentStep(4); // Zur Bestätigung wechseln
                                }}
                                disabled={!formData.gdprConsent}
                                className="min-w-32 bg-luxury-gold-500 hover:bg-luxury-gold-600 text-white"
                            >
                                {t("buttons.sendRequest")}
                            </Button>
                        )}
                    </>
                ) : (
                    // Step 4: Confirmation - nur "Fertig" Button
                    <div className="w-full flex justify-center">
                        <Button
                            onClick={onCancel}
                            className="min-w-40 bg-luxury-navy-900 hover:bg-luxury-navy-800 dark:bg-luxury-sand-100 dark:hover:bg-luxury-sand-200 dark:text-luxury-navy-900"
                        >
                            {t("buttons.done")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Step Components mit Glass-Panel Styling
function Step1({ formData, setFormData, onNext, t }: any) {
    return (
        <div className="glass-panel p-8">
            <h2 className="text-2xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-50">
                {t("step1.title")}
            </h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step1.description")}
            </p>
            {/* Hier würde der Kalender und die Gästeauswahl kommen */}
        </div>
    );
}

function Step2({ formData, setFormData, onNext, onBack, t }: any) {
    return (
        <div className="glass-panel p-8">
            <h2 className="text-2xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-50">
                {t("step2.title")}
            </h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step2.description")}
            </p>
            {/* Hier würde das Kontaktformular kommen */}
        </div>
    );
}

function Step3({ formData, setFormData, onBack, onComplete, t }: any) {
    return (
        <div className="glass-panel p-8">
            <h2 className="text-2xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-50">
                {t("step3.title")}
            </h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step3.description")}
            </p>
            {/* Hier würde die Zusammenfassung kommen */}
        </div>
    );
}

function Step4({ t }: any) {
    return (
        <div className="glass-panel p-8 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-luxury-gold-100 dark:bg-luxury-gold-900/30 flex items-center justify-center"
            >
                <PartyPopper className="w-10 h-10 text-luxury-gold-600 dark:text-luxury-gold-400" />
            </motion.div>
            <h2 className="text-2xl font-serif font-bold mb-4 text-luxury-navy-900 dark:text-luxury-sand-50">
                {t("step4.title")}
            </h2>
            <p className="text-luxury-navy-600 dark:text-slate-400 mb-6">
                {t("step4.description")}
            </p>
        </div>
    );
}
