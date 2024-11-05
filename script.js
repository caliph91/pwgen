function generatePassword(length, strength) {
            const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
            const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

            let charset = lowerCase;
            if (strength === 'medium') charset += upperCase + numbers;
            else if (strength === 'high') charset += upperCase + numbers + symbols;

            return Array.from(crypto.getRandomValues(new Uint8Array(length)))
                .map(x => charset[x % charset.length])
                .join('');
        }

        document.getElementById('singlePasswordLength').addEventListener('input', function() {
            document.getElementById('singleLengthValue').textContent = this.value;
        });

        document.getElementById('bulkPasswordLength').addEventListener('input', function() {
            document.getElementById('bulkLengthValue').textContent = this.value;
        });

        document.getElementById('generateSingle').addEventListener('click', function() {
            const length = document.getElementById('singlePasswordLength').value;
            const strength = document.getElementById('singlePasswordStrength').value;
            const password = generatePassword(length, strength);
            document.getElementById('singlePassword').value = password;
        });

        document.getElementById('generateBulk').addEventListener('click', function() {
            const length = document.getElementById('bulkPasswordLength').value;
            const strength = document.getElementById('bulkPasswordStrength').value;
            const count = document.getElementById('bulkCount').value;
            
            let bulkPasswords = '';
            for (let i = 0; i < count; i++) {
                bulkPasswords += `${i + 1}. ${generatePassword(length, strength)}\n`;
            }
            
            document.getElementById('bulkPasswords').value = bulkPasswords.trim();
        });

        function showPopup() {
            const popup = document.getElementById('popup');
            popup.classList.remove('opacity-0', 'translate-y-[-1rem]');
            popup.classList.add('opacity-100', 'translate-y-0');
            setTimeout(() => {
                popup.classList.remove('opacity-100', 'translate-y-0');
                popup.classList.add('opacity-0', 'translate-y-[-1rem]');
            }, 2000);
        }

        document.getElementById('copySingle').addEventListener('click', function() {
            const passwordInput = document.getElementById('singlePassword');
            passwordInput.select();
            document.execCommand('copy');
            
            // Change icon to checkmark
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            // Show popup
            showPopup();
            
            // Reset icon after 2 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
