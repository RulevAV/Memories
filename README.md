# Memories
Scaffold-DbContext "Host=localhost;Port=9991;Database=Memories;Username=Memories;Password=Memories;" Npgsql.EntityFrameworkCore.PostgreSQL -Context conMemories -Project Memories.Server -OutputDir "Entities" -Force -Debug

dotnet ef dbcontext scaffold "Host=localhost;Port=9991;Database=Memories;Username=Memories;Password=Memories;" Npgsql.EntityFrameworkCore.PostgreSQL -c conMemories --project Memories.Server --output-dir "Entities" --force --verbose


"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" --file "C:\Users\rulan\OneDrive\Документы\\Memories.dmp" --host "localhost" --port "9991" --username "Memories" --verbose --format=c --blobs "Memories" 

/opt/homebrew/bin/pg_dump --file=$HOME/Documents/Memories.dmp --host="localhost" --port="9991" --username="Memories" --verbose --format=c --blobs Memories

/opt/homebrew/bin/pg_restore --host=localhost --port=9900 --username=Memories --dbname=Memories --verbose --clean --if-exists "$HOME/Documents/Memories.dmp"

cd ~/Documents

чтоб новые контролеры работали их нужно добавить в файл proxy.conf.js
регистр в сервисе и в proxy важен!!!
