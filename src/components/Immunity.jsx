import { useState } from 'react';

const Immunity = () => {
    const protocols = [
        { title: "KYC Biométrico", detail: "Verificación de identidad de grado bancario.", icon: "👤" },
        { title: "Validación de Fondos", detail: "Proof-of-Funds en tiempo real.", icon: "💰" },
        { title: "Arbitraje Digital", detail: "Mediación neutral en cada transacción.", icon: "⚖️" }
    ];

    return (
        <section style={{ padding: '0 2rem 25vh', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <h2 style={{ color: '#fff', marginBottom: '3rem' }}>Protocolos de Confianza</h2>

                <div>
                    {protocols.map((item, index) => (
                        <div key={index} style={{
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            padding: '2rem 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}>
                            <span className="white-emoji" style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.25rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '1rem' }}>{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Immunity;
